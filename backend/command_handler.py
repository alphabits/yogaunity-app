from datetime import datetime
import json
import pika
from pymongo import MongoClient

from commands import SignupNewUser
from rabbitmq import RabbitMqCommandReceiver, RabbitMqEventPublisher
from eventstore_mongodb import MongoDbEventStore
from usecases import SignupNewUserUseCase
from views import UserCountView


command_queue = 'YUBackend.Q.Backend.Commands'
command_exchange = 'YUBackend.E.Fanout.Commands'
event_exchange = 'YUBackend.E.Fanout.Events'
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.exchange_declare(exchange=event_exchange, type='fanout', durable=True)
channel.exchange_declare(exchange=command_exchange, type='fanout', durable=True)
channel.queue_declare(queue=command_queue)
channel.queue_bind(exchange=command_exchange, queue=command_queue)


mongo = MongoClient()
event_stream_collection = mongo.event_store.events
views_db = mongo.views
mongo_event_store = MongoDbEventStore(event_stream_collection)

rabbitmq_event_publisher = RabbitMqEventPublisher(channel, event_exchange)
rabbitmq_command_receiver = RabbitMqCommandReceiver(channel, command_queue)

user_count_view = UserCountView(views_db.user_counts)


def event_pipeline(events):
    user_count_view(events)
    rabbitmq_event_publisher(events)


command_usecase_map = {
    SignupNewUser: SignupNewUserUseCase(mongo_event_store, event_pipeline)
}

def on_command_received(command):
    command_type = type(command)
    usecase_exists = command_usecase_map.has_key(command_type)
    if not usecase_exists:
        raise TypeError("Unknown command type received: " + command_type.__name__)
    command_usecase_map[command_type](command)


rabbitmq_command_receiver.start_consuming(on_command_received)

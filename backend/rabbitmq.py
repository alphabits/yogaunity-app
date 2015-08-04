from datetime import datetime
import json
import uuid

import commands
from events import serialize
from stringhelpers import dash_to_pascalcase, pascalcase_to_dash


def deserialize_command(command):
    classname = dash_to_pascalcase(command["name"])
    del command["name"]
    command_type = commands.__dict__[classname]
    command["command_time"] = datetime.now()
    return command_type(**command)


def create_receiver(on_command_received):
    def receive_command_message(ch, method, properties, body):
        command = deserialize_command(json.loads(body))
        on_command_received(command)

    return receive_command_message


class RabbitMqCommandReceiver(object):

    def __init__(self, channel, command_queue):
        self.channel = channel
        self.command_queue = command_queue


    def start_consuming(self, on_command_received):
        self.channel.basic_consume(create_receiver(on_command_received), queue=self.command_queue, no_ack=True)
        self.channel.start_consuming()




def date_handler(obj):
    if hasattr(obj, "isoformat"):
        return obj.isoformat()
    if type(obj) == uuid.UUID:
        return str(obj)
    return obj

def serialize_event(event):
    data = serialize(event)
    data["name"] = pascalcase_to_dash(event.__class__.__name__)
    json_str = json.dumps(data, default=date_handler)
    return json_str

class RabbitMqEventPublisher(object):

    def __init__(self, channel, event_exchange):
        self.channel = channel
        self.event_exchange = event_exchange


    def __call__(self, events):
        print "About to publish events"
        for e in events:
            self.publish_event(e)

    def publish_event(self, event):
        print "Publishing event " + event.__class__.__name__
        self.channel.basic_publish(
            exchange=self.event_exchange, 
            routing_key='', 
            body=serialize_event(event))

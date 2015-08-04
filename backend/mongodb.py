import events



class MongoDbEventStore(object):

    def __init__(self, mongo_collection):
        self.mongo_collection = mongo_collection


    def get_event_stream(self, aggregate_id):
        events = self.mongo_collection.find({"__aggregate_id__": aggregate_id})
        return [self.deserialize(e) for e in events]

    def save_events(self, aggregate_id, events):
        events_to_insert = [self.serialize(e, aggregate_id) for e in events]
        self.mongo_collection.insert(events_to_insert)            

    def serialize(self, event, aggregate_id):
        class_name = event.__class__.__name__
        event_data = {}
        event_data["event"] = events.serialize(event)
        event_data["__class_name__"] = class_name
        event_data["__aggregate_id__"] = aggregate_id
        return event_data

    def deserialize(self, event):
        class_name = event["__class_name__"]
        event_data = event["event"]
        event_data["event_info"] = events.EventInfo(**event_data["event_info"])
        return events.__dict__[class_name](**event_data)



class MongoDbViewStore(object):

    def __init__(self, db):
        self.db = view_db
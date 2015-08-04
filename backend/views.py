from stringhelpers import pascalcase_to_dash


def filter_by_type(events, event_types):
    if not isinstance(event_types, list):
        event_types = [event_types]
    return filter(lambda e: any(isinstance(e, t) for t in event_types), events)


class View(object):

    def __call__(self, events):
        for e in events:
            self.handle_event(e)

    def handle_event(self, event):
        method_name = "handle_" + pascalcase_to_dash(event.__class__.__name__, "_")
        if hasattr(self, method_name):
            getattr(self, method_name)(event)


class UserCountView(View):

    doc_id = "user_count"

    def __init__(self, collection):
        self.collection = collection

    def handle_signup_new_user_accepted(self, event):
        user_count = self.collection.find_one({"_id": self.doc_id})
        if not user_count:
            user_count = {"count": 0, "_id": self.doc_id}
        user_count["count"] += 1
        self.collection.update({"_id": self.doc_id}, user_count, upsert=True)



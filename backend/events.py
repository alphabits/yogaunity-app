from datetime import datetime
import uuid



def is_serializable(event):
    return hasattr(event, "_serialize")

def serialize(event):
    result = {}
    for p in event._serialize:
        value = event.__dict__[p]
        result[p] = value if not is_serializable(value) else serialize(value)
    return result


class EventInfo(object):

    _serialize = ["event_id", "event_date"]

    def __init__(self, event_id, event_date):
        self.event_id = event_id
        self.event_date = event_date

    @staticmethod
    def create_new():
        return EventInfo(uuid.uuid4(), datetime.now())


class SignupNewUserAccepted(object):

    _serialize = ["event_info", "userid", "username"]

    def __init__(self, event_info, userid, username):
        self.event_info = event_info
        self.userid = userid
        self.username = username


class SignupNewUserRejected(object):
    
    _serialize = ["event_info", "reason"]

    def __init__(self, event_info, reason):
        self.event_info = event_info
        self.reason = reason


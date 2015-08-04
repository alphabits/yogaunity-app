from datetime import datetime
from exceptions import TypeError
import uuid

from commands import SignupNewUser
from events import SignupNewUserAccepted, SignupNewUserRejected, EventInfo


class CommandResult(object):

    def __init__(self, success, events):
        self.success = success
        self.events = events

    @staticmethod
    def failure(events):
        if not isinstance(events, list):
            events = [events]
        return CommandResult(False, events)

    @staticmethod
    def success(events):
        if not isinstance(events, list):
            events = [events]
        return CommandResult(True, events)


class AggregateBase(object):

    def handle_initial_events(self, events):
        for e in events:
            self.handle_event(e)

    def handle_event(self, event):
        event_type = type(event)
        if not self.event_handlers.has_key(event_type):
            raise TypeError("Event not recognized in aggregate: " + event.__class__.__name__)

        return self.event_handlers[event_type](self, event)

    def handle_command(self, command):
        command_type = type(command)
        if not self.command_handlers.has_key(command_type):
            raise TypeError("Command not recognized in aggregate: " + command.__class__.__name__)
            
        return self.command_handlers[command_type](self, command)

    def generate_event_info(self):
        return EventInfo(uuid.uuid4(), datetime.now())



class UserManager(AggregateBase):

    def __init__(self, events):

        self.event_handlers = {
            SignupNewUserAccepted: UserManager.handle_signup_accepted
        } 
        self.command_handlers = {
            SignupNewUser: UserManager.handle_signup
        }

        self.user_map = {}
        self.handle_initial_events(events)


    def handle_signup_accepted(self, event):
        self.user_map[event.username] = event

    def handle_signup(self, command):
        event_info = self.generate_event_info()
        if self.user_map.has_key(command.username):
            return CommandResult.failure(SignupNewUserRejected(event_info, "User already exists"))
        else:
            return CommandResult.success(SignupNewUserAccepted(event_info, command.userid, command.username))



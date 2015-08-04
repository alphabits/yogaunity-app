from aggregates import UserManager



class SignupNewUserUseCase(object):

    def __init__(self, event_store, event_dispatcher):
        self.event_store = event_store
        self.event_dispatcher = event_dispatcher


    def __call__(self, command):
        user_manager_eventstream = self.event_store.get_event_stream("usermanager-stream")
        user_manager = UserManager(user_manager_eventstream)
        command_result = user_manager.handle_command(command)
        if command_result.success:
            self.event_store.save_events("usermanager-stream", command_result.events)

        self.event_dispatcher(command_result.events)
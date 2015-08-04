import unittest

from commands import SignupNewUser
from events import EventInfo, SignupNewUserAccepted
from rabbitmq import serialize_event, deserialize_command


class TestRabbitMq(unittest.TestCase):

    def test_deserialize_command(self):
        to_deserialize = {"name":"signup-new-user", "userid":42, "username":"cxzv", "password":"asdf"} 

        command = deserialize_command(to_deserialize)

        self.assertEqual(SignupNewUser, type(command))

    def test_serialize_event(self):
        event = SignupNewUserAccepted(EventInfo.create_new(), "3", "nam")
        data = serialize_event(event)



if __name__ == "__main__":
    unittest.main()
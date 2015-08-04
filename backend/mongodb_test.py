import unittest

from events import EventInfo, SignupNewUserAccepted
from eventstore_mongodb import MongoDbEventStore



class TestMongoDbEventStore(unittest.TestCase):

    def setUp(self):
        pass


    def test_serialization(self):
        sut = MongoDbEventStore({})

        event = SignupNewUserAccepted(EventInfo.create_new(), "a", "a")

        serialized_event = sut.serialize(event, "Test")

        self.assertEqual("SignupNewUserAccepted", serialized_event["__class_name__"])
        self.assertEqual("Test", serialized_event["__aggregate_id__"])

    def test_deserialization(self):
        sut = MongoDbEventStore({})

        event = SignupNewUserAccepted(EventInfo.create_new(), "a", "a")
        serialized_event = sut.serialize(event, "Test")

        deserialized_event = sut.deserialize(serialized_event)

        self.assertEqual(event.userid, deserialized_event.userid)
        self.assertEqual(event.username, deserialized_event.username)
        self.assertEqual(event.__class__, deserialized_event.__class__)


if __name__ == "__main__":
    unittest.main()
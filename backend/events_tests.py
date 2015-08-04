import unittest

from events import serialize, EventInfo, SignupNewUserAccepted




class TestEventSerializer(unittest.TestCase):

    def test_serializer(self):
        info = EventInfo.create_new()
        event = SignupNewUserAccepted(info, "A", "B")

        serialized_data = serialize(event)

        self.assertEqual("A", serialized_data["userid"])
        self.assertEqual("B", serialized_data["username"])
        self.assertEqual(dict, type(serialized_data["event_info"]))
        self.assertTrue(serialized_data["event_info"].has_key("event_date"))


if __name__ == "__main__":
    unittest.main()

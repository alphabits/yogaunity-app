from datetime import datetime
from exceptions import TypeError

from aggregates import UserManager
from commands import SignupNewUser
from events import SignupNewUserAccepted, SignupNewUserRejected
import unittest


class TestUserManager(unittest.TestCase):

    def setUp(self):
        pass

    def test_usermanager_accepts_new_user(self):
        sut = UserManager([])
        new_user_command = SignupNewUser(datetime.now(), 42, "anders", "pass")
        result = sut.handle_command(new_user_command)

        self.assertEqual(True, result.success)
        self.assertEqual(1, len(result.events))
        self.assertTrue(isinstance(result.events[0], SignupNewUserAccepted))

    def test_usermanager_fails_on_existing_user(self):
        sut = UserManager([SignupNewUserAccepted(datetime.now(), 42, "Anders")])
        new_user_command = SignupNewUser(datetime.now(), 42, "Anders", "pass")
        result = sut.handle_command(new_user_command)

        self.assertEqual(False, result.success)
        self.assertEqual(1, len(result.events))
        self.assertTrue(isinstance(result.events[0], SignupNewUserRejected))

    def test_usermanager_raises_exception_on_unknow_command(self):
        sut = UserManager([])
        unknown_command = {}
        self.assertRaises(TypeError, sut.handle_command, unknown_command)


if __name__ == "__main__":
    unittest.main()
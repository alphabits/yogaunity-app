import unittest

from stringhelpers import pascalcase_to_dash, dash_to_pascalcase


class TestStringHelpers(unittest.TestCase):

    def test_pascalcase_to_dash(self):
        self.assertEqual("anders-tester", pascalcase_to_dash("AndersTester"))
        self.assertEqual("anders-tester-mange", pascalcase_to_dash("AndersTesterMange"))
        self.assertEqual("anders-tester-iob", pascalcase_to_dash("AndersTesterIOB"))
        self.assertEqual("anders_tester_iob", pascalcase_to_dash("AndersTesterIOB", "_"))

    def test_dash_to_pascalcase(self):
        self.assertEqual("AndersTester", dash_to_pascalcase("anders-tester"))
        self.assertEqual("AndersTesterMange", dash_to_pascalcase("anders-tester-mange"))
        self.assertEqual("AndersTesterIOb", dash_to_pascalcase("anders-tester-i-ob"))
        self.assertEqual("AndersTesterIOb", dash_to_pascalcase("anders_tester_i_ob", "_"))


if __name__ == "__main__":
    unittest.main()
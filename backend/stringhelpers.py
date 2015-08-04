import re
import unittest



first_cap_re = re.compile('(.)([A-Z][a-z]+)')
all_cap_re = re.compile('([a-z0-9])([A-Z])')

def pascalcase_to_dash(s, dash="-"):
    s1 = first_cap_re.sub(r'\1{0}\2'.format(dash), s)
    return all_cap_re.sub(r'\1{0}\2'.format(dash), s1).lower()

def dash_to_pascalcase(s, dash="-"):
    parts = s.lower().split(dash)
    return "".join([p.capitalize() for p in parts])



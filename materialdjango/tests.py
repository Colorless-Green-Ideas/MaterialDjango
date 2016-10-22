from django.test import TestCase
from forms import PaperLoginForm
from materialdjango.widgets import PaperPasswordInput, PaperTextInput

try:
    import unittest.mock as mock
except ImportError:
    import mock

# https://github.com/django/django/blob/1.10/tests/forms_tests/widget_tests/test_textinput.py


class TestPaperLoginForm(TestCase):
    def test_has_no_label(self):
        our_form = PaperLoginForm(None)
        self.assertEqual(our_form.fields['username'].label, "")
        self.assertEqual(our_form.fields['password'].label, "")

    def test_uses_paper_widgets(self):
        our_form = PaperLoginForm(None)
        self.assertIsInstance(our_form.fields['username'].widget, PaperTextInput)
        self.assertIsInstance(our_form.fields['password'].widget, PaperPasswordInput)

    def test_full_render(self):
        our_form = PaperLoginForm(None)
        html = our_form.as_p()
        # self.assertInHTML("</paper-input-container>",html)
        self.assertInHTML("<label>username</label>",html)
        self.assertInHTML("<label>password</label>",html)


class TestPolymerDep(TestCase):
    def test_interpolation(self):
        pass

class TestAllWidgets(TestCase):
    def test_textinput(self):
        pass
from django import forms
from  django.contrib.auth.forms import AuthenticationForm
from widgets import PaperTextInput, PaperPasswordInput


class PaperLoginForm(AuthenticationForm):
    username = forms.CharField(max_length=254, label='', widget=PaperTextInput)
    password = forms.CharField(label='', widget=PaperPasswordInput)
    def __init__(self, request, *args, **kwargs):
        super(PaperLoginForm, self).__init__(*args, **kwargs)



def mangle_form(form):
    "Utility to monkeypatch forms into paperinputs, untested"
    for field, widget in form.fields.iteritems():
        if type(widget) is forms.widgets.TextInput:
            form.fields[field].widget = PaperTextInput()
            form.fields[field].label = ''
        if type(widget) is forms.widgets.PasswordInput:
            field.widget = PaperPasswordInput()
            field.label = ''
    return form
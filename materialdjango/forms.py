from django import forms
from widgets import PaperTextInput, PaperPasswordInput


def mangle_form(form):
    "Utility to monkeypatch forms into paperinputs, untested"
    for field in form.fields:
        if type(field.widget) is forms.widgets.Textarea:
            field.widget = PaperTextInput()
            field.label = ''
        if type(field.widget) is forms.widgets.PasswordInput:
            field.widget = PaperPasswordInput()
            field.label = ''
    return form
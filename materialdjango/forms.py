from widgets import PaperTextInput

def mangle_form(form):
    "Utility to monkeypatch forms into paperinputs, untested"
    for field in form.fields:
        if type(field.widget) is forms.widgets.Textarea:
            field.widget = PaperTextInput()
            field.label = ''
    return form
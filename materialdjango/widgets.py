from django.forms.widgets import TextInput, PasswordInput, EmailInput
from django.utils.html import format_html

# ref https://github.com/django/django/blob/stable/1.8.x/django/forms/widgets.py

class PaperTextInput(TextInput):

    def render(self, name, value, attrs=None):
        # Unlike inputs using paper-input-decorator directly,
        # paper-input does not work out of the box with the native form
        # element.
        if value is None:
            html = """<paper-input-decorator label='{0}' floatingLabel>
            <input is="core-input" name="{0}">
            </paper-input-decorator>"""
            return format_html(html, name)
        else:
            html = """<paper-input-decorator label='{0}' floatingLabel>
            <input is="core-input" name="{0}" value="{1}">
            </paper-input-decorator>"""
            return format_html(html, name, value)


class PaperPasswordInput(PasswordInput):

    def render(self, name, value, attrs=None):
        if value is None:
            html = """<paper-input-decorator label='{0}' floatingLabel>
            <input is="core-input" name="{0}" type="password"/>
            </paper-input-decorator>"""
            return format_html(html, name)
        else:
            html = """<paper-input-decorator label='{0}'  type="password" floatingLabel>
            <input is="core-input" name="{0}" type="password" value="{1}"/>
            </paper-input-decorator>"""
            return format_html(html, name, value)

class PaperEmailInput(EmailInput):
    def __init__(self, attrs=None):
        if attrs is not None:
            self.attrs = attrs.copy()
        else:
            self.attrs = {}
    def render(self, name, value, attrs=None):
        if value is None:
            html = """<paper-input-decorator label='{0}' floatingLabel autoValidate>
            <input is="core-input" name="{1}" type="email">
            </paper-input-decorator>"""
            if 'label' in self.attrs:
                return html.format(self.attrs['label'], name)
            else:
                return format_html(html, name, name)
        else:
            html = """<paper-input-decorator label='{0}' floatingLabel autoValidate>
            <input is="core-input" name="{0}" value="{1}" type="email">
            </paper-input-decorator>"""
            return format_html(html, name, value)
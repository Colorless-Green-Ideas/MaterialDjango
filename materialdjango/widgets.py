from django.forms.widgets import TextInput
from django.utils.html import format_html


class PaperTextInput(TextInput):
    def render(self, name, value, attrs=None):
    # Unlike inputs using paper-input-decorator directly, 
    # paper-input does not work out of the box with the native form element.
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
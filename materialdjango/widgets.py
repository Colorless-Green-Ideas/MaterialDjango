from django.forms.widgets import TextInput, PasswordInput, EmailInput, CheckboxInput, Textarea
from django.utils.html import format_html

# ref https://github.com/django/django/blob/stable/1.8.x/django/forms/widgets.py
# https://github.com/django/django/blob/stable/1.10.x/django/forms/widgets.py

class PaperTextInput(TextInput):

    def render(self, name, value, attrs=None):
        # Unlike inputs using paper-input-container directly,
        # paper-input does not work out of the box with the native form
        # element.
        if value is None:
            html = u"""<paper-input-container label='{0}' >
            <label>{0}</label>
            <input is="iron-input" name="{0}" class="paper-input-input">
            </paper-input-container>"""
            return format_html(html, name)
        else:
            html = u"""<paper-input-container label='{0}' attr-for-value="value">
            <label>{0}</label>
            <input is="iron-input" name="{0}" value="{1}">
            </paper-input-container>"""
            return format_html(html, name, value)


class PaperPasswordInput(PasswordInput):

    def render(self, name, value, attrs=None):
        if value is None:
            html = u"""<paper-input-container label='{0}'>
            <label>{0}</label>
            <input is="iron-input" name="{0}" type="password"/>
            </paper-input-container>"""
            return format_html(html, name)
        else:
            html = u"""<paper-input-container label='{0}'  type="password" attr-for-value="value">
            <label>{0}</label>
            <input is="iron-input" name="{0}" type="password" value="{1}"/>
            </paper-input-container>"""
            return format_html(html, name, value)

class PaperEmailInput(EmailInput):
    def __init__(self, attrs=None):
        if attrs is not None:
            self.attrs = attrs.copy()
        else:
            self.attrs = {}
    def render(self, name, value, attrs=None):
        if value is None:
            html = u"""<paper-input-container label='{0}' autoValidate>
            <label>{0}</label>
            <input is="iron-input" name="{1}" type="email">
            </paper-input-container>"""
            if 'label' in self.attrs:
                return html.format(self.attrs['label'], name)
            else:
                return format_html(html, name, name)
        else:
            html = u"""<paper-input-container label='{0}' autoValidate attr-for-value="value">
            <label>{0}</label>
            <input is="iron-input" name="{0}" value="{1}" type="email">
            </paper-input-container>"""
            return format_html(html, name, value)

class PaperTextArea(Textarea):
    def render(self, name, value, attrs=None):
        if value is None:
            html = u"""<paper-input-container>
            <label>{1}</label>
            <iron-autogrow-textarea class="paper-input-input" name="{0}" rows=3>
            </iron-autogrow-textarea>
            </paper-input-container>"""
            if 'label' in self.attrs:
                return html.format(self.attrs['label'], name)
            else:
                return format_html(html, name, name)
        else:

            html = u"""<paper-input-container>
            <label>{0}</label>
            <iron-autogrow-textarea class="paper-input-input" name="{0}" value="{1}" rows=3>
            </iron-autogrow-textarea>
            </paper-input-container>"""
            return format_html(html, name, value)

class PaperCheckboxInput(CheckboxInput):
    def __init__(self, attrs=None, check_test=None):
        super(PaperCheckboxInput, self).__init__(attrs)
    def render(self, name, value, attrs=None):
        html = u"""<paper-checkbox>{0}</paper-checkbox>"""
        return format_html(html, name)
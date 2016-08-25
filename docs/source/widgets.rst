=======
Widgets
=======

Each widget is a subclass of their respective **django.forms.widgets** classes (e.g., **materialdjango.PaperTextInput** is subclassed from **django.forms.widgets.TextInput**). For more information, see Django's `widgets documentation`_.

.. note::

    While the following widgets are prefixed with **Paper**, they actually use `<iron-input>`:code: styling for the moment, as `<paper-input>`:code: styling doesn't work properly with `<form>`:code: tags. This will be fixed eventually, and these will likely be renamed with **Iron** prefixes.

.. _widgets documentation: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/

.. py:class:: PaperTextInput

    Subclass of Django's `TextInput`_ with `<iron-input>`:code: Material Design styling.

.. py:class:: PaperPasswordInput

    Subclass of Django's `PasswordInput`_ widget with `<iron-input>`:code: Material Design styling.

.. py:class:: PaperEmailInput

    Subclass of Django's `EmailInput`_ widget with `<iron-input>`:code: Material Design styling.

.. py:class:: PaperTextArea

    Subclass of Django's `TextArea`_ widget with `<iron-input>`:code: Material Design styling.

.. py:class:: PaperCheckboxInput

    Subclass of Django's `CheckboxInput`_ widget with `<iron-input>`:code: Material Design styling.

.. _TextInput: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/#textinput
.. _PasswordInput: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/#passwordinput
.. _EmailInput: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/#emailinput
.. _TextArea: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/#textarea
.. _CheckboxInput: https://docs.djangoproject.com/en/1.10/ref/forms/widgets/#checkboxinput

=====
Forms
=====

.. py:class:: PaperLoginForm

    Subclass of Django's `AuthenticationForm`_. Uses `PaperTextInput`_ and `PaperPasswordInput`_ widgets.

.. py:function:: mangle_form(form)

    Utility to monkeypatch forms into PaperInputs. Currently untested.

.. _AuthenticationForm: https://docs.djangoproject.com/en/1.10/topics/auth/default/#django.contrib.auth.forms.AuthenticationForm
.. _PaperTextInput: widgets.html#PaperTextInput
.. _PaperPasswordInput: widgets.html#PaperPasswordInput

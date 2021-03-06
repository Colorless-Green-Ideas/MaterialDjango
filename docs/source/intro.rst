===============
Getting Started
===============

Installation
============

 - ``pip install materialdjango``
 - add ``materialdjango`` to your ``INSTALLED_APPS`` in settings.py
 - re-run ``manage.py collectstatic``

Features
========

.. code-block:: html

    <link rel="import" href="materialdjango/components/bower_components/paper-input/paper-input-container.html>


becomes ``{{ "paper-input/paper-input-container.html" |dep}}``

We vendor polymer elements for import from ``PolymerElements/paper-elements`` and ``PolymerElements/iron-elements``. Approximate versions specified in our `bower.json <https://github.com/Colorless-Green-Ideas/MaterialDjango/blob/master/bower.json>`_. If you'd like another suite added to our vendoring file an issue on github.

We also ship widgets for use in Django forms.

Usage
=====

.. code-block:: django

    {% load polymerdep %}
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    {{polymer_shim}} # this belongs at the head of document
    {{ "polymer/polymer.html" |dep}}
    {{ "paper-input/paper-input-container.html" |dep}}
    {{ "iron-input/iron-input.html" |dep}}
    </head>
    <body>
        {{form.as_p}}
    </body>

in ``app/forms.py`` ::

    from django import forms
    from django.contrib.auth.forms import AuthenticationForm
    from widgets import PaperTextInput, PaperPasswordInput


    class PaperLoginForm(AuthenticationForm):
        username = forms.CharField(max_length=254, label='', widget=PaperTextInput)
        password = forms.CharField(label='', widget=PaperPasswordInput)
        def __init__(self, request, *args, **kwargs):
            super(PaperLoginForm, self).__init__(*args, **kwargs)

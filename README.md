# MaterialDjango
[![Code Health](https://landscape.io/github/Colorless-Green-Ideas/MaterialDjango/master/landscape.svg?style=flat)](https://landscape.io/github/Colorless-Green-Ideas/MaterialDjango/master)
[![PyPI](https://img.shields.io/pypi/v/materialdjango.svg)](https://pypi.python.org/pypi/MaterialDjango)

Polymer Paper-UI widgets and tools for django


# Install
 - `pip install materialdjango`
 - add `materialdjango` to your INSTALLED_APPS in settings.py
 - re-run `manage.py collectstatic`

# Getting Started
 - make sure you `{% load staticfiles %}`
 - and also add `{% load polymerdep %}` which imports our filter `|dep`
 - Add the webcomponents.js shim
 - use `dep` to import included polymer html elements (currently 1.0)

Eg:
```html
{% load staticfiles %}
{% load polymerdep %}
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <script src="{% static 'materialdjango/components/bower_components/webcomponentsjs/webcomponents-lite.js' %}"></script>
    {{ "polymer/polymer.html" | dep}}
<...>
```

## I want to go faster

Use my `base.html` template with `vinyl-siding.html` which is imspired by the polymer documentation.

`{% extends "vinyl-siding.html" %}`

## How do I Use polymer elements?

Documentation for polymer elements is contained on [the element catalog](https://elements.polymer-project.org/browse?package=paper-elements). We include the Paper and Iron collections. 

## Additional Components
Additional components should be installed with [bower](http://bower.io/) and symlinked to your app's static/ directory (see the materialdjango source for an example). Alternatively you may download them as a zip from the catalog and place them in your app's static/ directory.


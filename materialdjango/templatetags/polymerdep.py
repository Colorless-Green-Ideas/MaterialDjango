from django import template
from django.conf import settings
from django.core.urlresolvers import reverse_lazy
from django.templatetags.static import static


register = template.Library()


@register.filter(is_safe=True)
def dep(value="polymer/polymer.html"):
    # should you really be able to do this over reverse_lazy???
    static_url = static(
        "materialdjango/components/bower_components/%s" % value)
    return '<link rel="import" href="{0}">'.format(static_url)

def shim():
    return  "<script src='{% static 'materialdjango/components/bower_components/webcomponentsjs/webcomponents.js' %}'></script>"
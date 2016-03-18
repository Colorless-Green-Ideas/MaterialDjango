from django import template
from django.conf import settings
from django.templatetags.static import static
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter(is_safe=True)
def dep(value="polymer/polymer.html"):
    # should you really be able to do this over reverse_lazy???
    static_url = static(
        "materialdjango/components/bower_components/%s" % value)
    return '<link rel="import" href="{0}">'.format(static_url)


@register.simple_tag
def polymer_shim():
    static_url = static('materialdjango/components/bower_components/webcomponentsjs/webcomponents.js')
    return mark_safe("<script src='{0}'></script>".format(static_url))

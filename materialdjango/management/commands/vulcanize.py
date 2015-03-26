from django.core.management.base import BaseCommand, CommandError
from django.template.loader import get_template
from django.template import Context, Template

def vulcanize_prep(templatename):
    "make html!"
    return get_template(templatename).render(Context())

class Command(BaseCommand):
    args =
    help = "Combine html imports into one import"
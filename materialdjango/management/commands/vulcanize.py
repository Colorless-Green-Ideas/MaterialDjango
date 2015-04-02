from django.core.management.base import BaseCommand, CommandError
from django.template.loader import get_template
from django.template import Context, Template

#https://docs.djangoproject.com/en/1.7/howto/custom-management-commands/

def vulcanize_prep(templatename):
    "make html!"
    return get_template(templatename).render(Context())

class Command(BaseCommand):
    # args = 
    help = "Combine html imports into one import"
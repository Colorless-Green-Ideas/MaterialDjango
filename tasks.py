from invoke import task

@task
def test(c):
    c.run("")

@task
def rollup(c):
    c.run("yarn run rollup -wc")
@task
def devserver(c):
    c.run("pipenv run python testing/manage.py runserver 0.0.0.0:6660")
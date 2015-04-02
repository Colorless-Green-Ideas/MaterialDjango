#! /usr/bin/env python

from setuptools import setup
from setuptools import find_packages


setup(name="MaterialDjango",
      version="0.1a3",
      packages=find_packages(),
      # scripts=[],
      author="Jack Laxson",
      author_email="jack@getpizza.cat",
      description="",
      license="MIT License",
      include_package_data=True,
      install_requires=["django", "vulcanize", 'bower.py'],
      url="https://github.com/Colorless-Green-Ideas/MaterialDjango",
      classifiers=["License :: OSI Approved :: MIT License", 
      "Framework :: Django", "Topic :: Text Processing :: Markup :: HTML", 
      'Topic :: Internet :: WWW/HTTP :: Dynamic Content',]
      )

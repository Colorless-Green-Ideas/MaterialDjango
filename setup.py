#! /usr/bin/env python

from setuptools import setup
from setuptools import find_packages


setup(name="MaterialDjango",
      version="0.2.3",
      packages=find_packages(),
      # scripts=[],
      author="Jack Laxson",
      author_email="jack@getpizza.cat",
      description="A Django library bringing paper-ui and iron polymer elements to django",
      license="MIT",
      include_package_data=True,
      zip_safe=False,
      install_requires=["django"],
      url="https://github.com/Colorless-Green-Ideas/MaterialDjango",
      keywords=["polymer",  "paper-ui", "material design", "widgets", "theme"],
      classifiers=["License :: OSI Approved :: MIT License",
      'Intended Audience :: Developers', 'Development Status :: 3 - Alpha', 
      "Framework :: Django", "Topic :: Text Processing :: Markup :: HTML", 
      'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
      'Programming Language :: Python :: 2', 'Programming Language :: Python :: 2.7']
      )

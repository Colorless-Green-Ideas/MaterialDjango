#! /usr/bin/env python

from setuptools import setup
setup(name="MaterialDjango",
      version="0.1a1",
      packages=["materialdjango"],
      # scripts=[],
      author="Jack Laxson",
      author_email="jack@getpizza.cat",
      description="",
      #license
      install_requires=["django", "vulcanize",],
      url="https://github.com/Colorless-Green-Ideas/MaterialDjango",
      classifiers=["License :: OSI Approved :: MIT License", 
      "Framework :: Django", "Topic :: Text Processing :: Markup :: HTML",]
      )

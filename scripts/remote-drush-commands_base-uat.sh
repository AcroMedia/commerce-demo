#!/bin/bash -ue

# We run our drush commands here instead of in the .gitlab-ci.yml file because
# php 7.0 is the default on the server, and drush keeps hitting that instead of
# the 7.1 that we need.

# $HOME = /home/commerce-2-demo

function main () {
  # Make sure there is a bin dir in the home directory.
  test -d $HOME/bin || mkdir $HOME/bin

  # Make sure PHP is the version we want.
  test -x $HOME/bin/php && rm $HOME/bin/php
  ln -s /usr/bin/php7.1 $HOME/bin/php

  # Make sure Drush is the version we want.
  test -x $HOME/bin/drush && rm $HOME/bin/drush
  ln -s $HOME/www/commerce-2-demo/vendor/drush/drush/drush $HOME/bin/drush

  # Make sure our versions of Drush and our PHP are the first ones encountered by CLI tools.
  export PATH=$HOME/bin:$PATH

  # Some feedback for GitLab jobs
  which drush
  drush --version
  which php
  php -v

  # Time to do some work.
  cd $HOME/www/commerce-2-demo/web
  drush updb -y
  drush entup -y
  drush cr
}

# Waiting until now to execute the script ensures that the whole thing arrives before anything gets attempted.
main "$@"

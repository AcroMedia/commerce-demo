#!/bin/bash -ue

function main () {
  test -x $HOME/bin/php && rm -v $HOME/bin/php
  ln -v -s /usr/bin/php7.1 $HOME/bin/php

  test -x $HOME/bin/drush && rm -v $HOME/bin/drush
  ln -v -s /home/commerce-2-demo/www/commerce-2-demo/vendor/drush/drush/drush $HOME/bin/drush

  export PATH=$HOME/bin:$PATH

  which drush
  drush --version
  which php
  php -v

  cd /home/commerce-2-demo/www/commerce-2-demo/web
  drush entup -y
  drush updb -y
  drush cr

  echo OK
}

# Waiting until now to execute the script ensures that the whole thing arrives before anything gets attempted.
main "$@"

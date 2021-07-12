#!/bin/bash -ue

# We run our drush commands here instead of in the .gitlab-ci.yml file because
# the default version of php on the server doesn't always match the version we need.

function update_database() {
  cp ../dumps/$2.database.sql ../database.sql
  drush sql-drop -y
  drush sql-cli < ../database.sql
  drush state:set system.maintenance_mode 1 --input-format=integer
  drush updb -y
  drush cr
}

function main () {
  # Make sure there is a bin dir in the home directory.
  test -d $HOME/bin || mkdir $HOME/bin

  # Make sure PHP is the version we want.
  test -x $HOME/bin/php && rm $HOME/bin/php
  ln -s /usr/bin/php7.2 $HOME/bin/php

  # Make sure Drush is the version we want.
  test -x $HOME/bin/drush && rm $HOME/bin/drush
  ln -s $HOME/www/$1/vendor/drush/drush/drush $HOME/bin/drush

  # Make sure our versions of Drush and our PHP are the first ones encountered by CLI tools.
  export PATH=$HOME/bin:$PATH

  # Some feedback for GitLab jobs.
  which drush
  drush --version
  which php
  php -v

  # Update the database.
  cd $HOME/www/$1/web
  drush state:set system.maintenance_mode 1 --input-format=integer
  if [ ! -e ../database.sql ]; then
    update_database "$@"
  else
    db_md5_old=($(md5sum "../database.sql"))
    db_md5_new=($(md5sum "../dumps/$2.database.sql"))
    if [[ "$db_md5_old" != "$db_md5_new" ]]; then
      mv ../database.sql ../db_backups/database_$(date +%Y-%m-%d).sql
      update_database "$@"
    fi
  fi
  drush state:set system.maintenance_mode 0 --input-format=integer
}

# Waiting until now to execute the script ensures that the whole thing arrives before anything gets attempted.
main "$@"

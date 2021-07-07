#!/bin/bash -ue

# We run our drush commands here instead of in the .gitlab-ci.yml file because
# the default version of php on the server doesn't always match the version we need.

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
  cd $HOME/www/$2/web
  drush state:set system.maintenance_mode 1 --input-format=integer
  git -C ../dumps/ pull
  db_md5_old=($(cat "../database.sql.md5"))
  db_md5_new=($(md5sum "../dumps/$3.database.sql"))
  if [[ "$db_md5_old" != "$db_md5_new" ]]; then
    mv ../database.sql ../db_backups/database_$(date +%Y-%m-%d).sql
    cp ../dumps/$3.database.sql ../database.sql
    md5sum ../database.sql > ../database.sql.md5
    drush sql-drop -y
    drush sql-cli < ../database.sql
    drush state:set system.maintenance_mode 1 --input-format=integer
    drush updb -y
    drush cr
  fi
  drush state:set system.maintenance_mode 0 --input-format=integer
}

# Waiting until now to execute the script ensures that the whole thing arrives before anything gets attempted.
main "$@"

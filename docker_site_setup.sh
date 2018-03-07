#!/bin/bash

user_site_name() {
  if [ -z "${SITE_NAME}" ]; then
    read -p "Enter a site name (ie: urbanhipster): " USER_SITE_NAME
  else
    read -p "Enter a site name (ie: urbanhipster), or hit enter to keep \"${SITE_NAME}\": " USER_SITE_NAME
    [ -z "${USER_SITE_NAME}" ] && USER_SITE_NAME="${SITE_NAME}"
  fi
  
  if [ -z "${USER_SITE_NAME}" ]; then
    echo "Site name can not be empty"
    return 1
  fi
  
  echo "${USER_SITE_NAME}"
}

user_db_name() {
  if [ -z "${DB_NAME}" ]; then
    read -p "Enter a database name for the site: " USER_DB_NAME
  else
    read -p "Enter a database name for the site, or hit enter to keep \"${DB_NAME}\": " USER_DB_NAME
    [ -z "${USER_DB_NAME}" ] && USER_DB_NAME="${DB_NAME}"
  fi
  
  if [ -z "${USER_DB_NAME}" ]; then
    echo "Database name can not be empty"
    return 1
  fi
  
  echo "${USER_DB_NAME}"
}

user_doc_root() {
  if [ -z "${DOC_ROOT}" ]; then
    read -p "Enter a doc root for the site (e.g. wwwroot, web), or hit enter if the doc root is the project root: " USER_DOC_ROOT
  else
    read -p "Enter a doc root for the site (e.g. wwwroot, web), or hit enter to keep \"${DOC_ROOT}\": " USER_DOC_ROOT
    [ -z "${USER_DOC_ROOT}" ] && USER_DOC_ROOT="${DOC_ROOT}"
  fi
  
  echo "${USER_DOC_ROOT}"
}

main() (
  set -e
  echo -e "\n** This script helps setup your site's Docker containers **\n"
  echo "- this script only needs to be run once for a site (successfully)"
  echo "- make sure this file is in your repo root along with the default docker-compose.yml file and and uncompressed version of the site's dbdump"
  echo -e "\n"
  
  SITE_NAME=$(user_site_name) || return 1
  if grep -q "SITE_NAME=" .env; then
    sed -i -e "s/SITE_NAME=.*/SITE_NAME=${SITE_NAME}/g" .env
  else
    echo "SITE_NAME=${SITE_NAME}" >> .env
  fi
  echo "...\"${SITE_NAME}\" chosen as site name"

  DB_NAME=$(user_db_name) || return 1
  if grep -q "DB_NAME=" .env; then
    sed -i -e "s/DB_NAME=.*/DB_NAME=${DB_NAME}/g" .env
  else
    echo "DB_NAME=${DB_NAME}" >> .env
  fi
  echo "...\"${DB_NAME}\" chosen as database name"
  
  DOC_ROOT=$(user_doc_root) || return 1
  if grep -q "DOC_ROOT=" .env; then
    sed -i -e "s/DOC_ROOT=.*/DOC_ROOT=${DOC_ROOT}/g" .env
  else
    echo "DOC_ROOT=${DOC_ROOT}" >> .env
  fi
  if [ -z "${DOC_ROOT}" ]; then
    echo "...Doc root is the same as the project root"
  else
    echo "...\"${DOC_ROOT}\" chosen as doc root"
  fi
  
  read -p "Enter the path to the site's uncompressed database dump, or hit enter to skip database import: " DBDUMP
  if [ ! -f "${DBDUMP}" ]; then
    echo "Database file at path '${DBDUMP}' not found"
  fi
  
  if [ ! "$(docker ps -aq -f name=mysql_data)" ]; then
    echo "You haven't created a MySQL data volume container for Docker yet. Creating one now."
    docker create --volume /var/lib/mysql --name mysql_data mysql
  fi
  
  SOLR=false
  if grep -q "solr:" ./docker-compose.yml; then
    echo "Solr found in docker-compose.yml"
    if ! (find ./ -type d -name search_api_solr | grep -q search_api_solr); then
      echo "Module 'search_api_solr' not found"
      exit 1
    fi
    SOLR=true
    if [ ! "$(docker ps -aq -f name=solr_data)" ]; then
      echo "You haven't created a Solr data volume container for Docker yet. Creating one now."
      docker create --volume /opt/solr --name solr_data solr:5
    fi
  fi
  
  echo "Starting up docker containers..."
  docker-compose up -d
  
  # Wait for mysql to become active
  MYSQL_CONTAINER=$(docker-compose ps -q mysql)
  while ! docker exec "${MYSQL_CONTAINER}" /bin/sh -c "mysql -u \$MYSQL_USER -p\$MYSQL_PASSWORD -e '' > /dev/null 2>&1"; do
    sleep 1
  done
  
  echo "Creating database..."
  docker exec "${MYSQL_CONTAINER}" /bin/sh -c "mysql -u root -p\$MYSQL_ROOT_PASSWORD -e \"CREATE DATABASE IF NOT EXISTS ${DB_NAME};\""
  
  echo "Setting MySQL Permissions..."
  docker exec "${MYSQL_CONTAINER}" /bin/sh -c "mysql -u root -p\$MYSQL_ROOT_PASSWORD -e \"GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '\${MYSQL_USER}'@'%';\""

  if ${SOLR}; then
    echo "Creating Solr index..."
  
    SOLR_CONTAINER=$(docker-compose ps -q solr)
  
    docker exec "$SOLR_CONTAINER" /bin/sh -c "mkdir -p /opt/solr/server/solr/${SITE_NAME}"
    docker exec "$SOLR_CONTAINER" /bin/sh -c "mkdir -p /opt/solr/server/solr/${SITE_NAME}/conf"
  
    docker exec "$SOLR_CONTAINER" /bin/sh -c "SOLR_PATH=\$(find /var/www/html -type d -name search_api_solr | grep search_api_solr) && cp \${SOLR_PATH}/solr-conf/5.x/* /opt/solr/server/solr/${SITE_NAME}/conf"
  
    docker exec "$SOLR_CONTAINER" /bin/sh -c "chmod -R 775 /opt/solr/server/solr/${SITE_NAME}"
    docker exec "$SOLR_CONTAINER" /bin/sh -c "chown -R solr:solr /opt/solr/server/solr/${SITE_NAME}"
    docker exec "$SOLR_CONTAINER" /bin/sh -c "/opt/solr/bin/solr create -c ${SITE_NAME} || true"
  fi
  
  if [ ! -z "${DBDUMP}" ]; then
    echo "Importing database (this can take a while depending on the size of the database)..."
    mysql_import_command="mysql -u root -p\$MYSQL_ROOT_PASSWORD $DB_NAME < /var/www/html/$DBDUMP"
    docker exec "$MYSQL_CONTAINER" /bin/sh -c "$mysql_import_command"
  fi
  
  echo -e "\n\n"
  echo "Your site URL is: ${SITE_NAME}.docker.localhost"
  
  if ${SOLR}; then
    echo 'When configuring your Solr host in Drupal make sure you set it to "solr" rather than "localhost"'
    echo -e "\n"
  fi
)


test -f ".env" || {
  echo ".env file not found, please see the readme at https://git.acromedia.com/acro/docker"
  exit 1
}

test -f "docker-compose.yml" || {
  echo "docker-compose.yml file not found, please see the readme at https://git.acromedia.com/acro/docker"
  exit 1
}

source ./.env
main

if [ $? -ne 0 ] ; then
  echo "Error encountered, shutting down containers if they are set up"
  [[ $(docker-compose ps -q | wc -l) -gt 0 ]] && docker-compose down
fi

#!/usr/bin/env bash

set -e

function _colored()   { tput -Txterm setaf ${1}; echo -e ${2}; tput -Txterm sgr0; }
function log_action()  { _colored 3 "${1}"; }

readonly MACHINE_NAME="mypodcasts-api"
readonly HAS_MACHINE=$(docker-machine ls | grep -c $MACHINE_NAME)
readonly HAS_RUNNING_MACHINE=$(docker-machine ls | grep $MACHINE_NAME | grep -c "Running")
readonly HAS_GARBAGE=$(docker images -f "dangling=true" -q)

if [ $HAS_MACHINE -eq 0 ]; then
  log_action "Creating machine ..."
  docker-machine create -d virtualbox $MACHINE_NAME
  eval "$(docker-machine env $MACHINE_NAME)"
fi

log_action "Starting machine ..."
docker-machine start $MACHINE_NAME
eval "$(docker-machine env $MACHINE_NAME)"

if [[ ! -z $DOCKER_HOST ]]; then
  log_action "Initializing docker ..."

  docker-compose build
  docker-compose up -d
fi

docker ps

log_action 'Done!'

echo -e `docker-machine ls | grep ${MACHINE_NAME}`

if [[ ! -z $HAS_GARBAGE ]]; then
  docker rmi -f $HAS_GARBAGE
fi

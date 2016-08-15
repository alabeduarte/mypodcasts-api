#!/usr/bin/env bash

set -e

MONGO_CONTAINER_ID=$(docker ps | grep mongo | awk '{print$1}')
MONGODB_HOSTS=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $MONGO_CONTAINER_ID)

rm .env
echo MONGODB_HOSTS=$MONGODB_HOSTS >.env

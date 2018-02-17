#!/bin/bash

if [[ -n "$1" ]]; then
  ssh jorgeadolfo.com "mkdir /opt/g3org3/$1"
  scp docker/docker-compose.yml jorgeadolfo.com:/opt/g3org3/$1/
else
  echo "please provide a project name, i.e. init-server.sh my-app"
fi

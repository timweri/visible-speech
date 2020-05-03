#!/bin/bash
docker-compose build ${1} && docker-compose run ${1}

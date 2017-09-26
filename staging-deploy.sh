#!/bin/bash
# this will deploy the application-server with staging environment

docker build . -t multus/application-server:staging
docker push multus/application-server:staging
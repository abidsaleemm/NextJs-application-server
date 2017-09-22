#!/bin/bash

docker build . -t multus/application-server
docker push multus/application-server

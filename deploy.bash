#!/bin/bash

docker build . -t hackexpert/application-server
docker push hackexpert/application-server
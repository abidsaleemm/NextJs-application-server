#!/bin/bash

# TODO Remove sudo?
sudo docker build . -t multus/application-server
sudo docker push multus/application-server

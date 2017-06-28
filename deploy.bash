#!/bin/bash

sudo docker build . -t hackexpert/application-server
sudo docker push hackexpert/application-server
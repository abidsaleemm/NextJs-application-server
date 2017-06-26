#!/bin/bash

scp docker-compose.yml adminuser@multus.westus.cloudapp.azure.com:~/
sudo docker build . -t hackexpert/multus
sudo docker push hackexpert/multus

# Do Pull on remore
ssh adminuser@multus.westus.cloudapp.azure.com "sudo docker pull hackexpert/multus"
ssh adminuser@multus.westus.cloudapp.azure.com "sudo docker-compose up -d --force-recreate --remove-orphans"

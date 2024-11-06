#!/usr/bin/env bash

# UPDATE WITH https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

sudo apt-get update && sudo apt-get -y upgrade

sudo apt-get install -y software-properties-common curl git

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce bash-completion
sudo usermod -aG docker ${USER}

sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo mkdir /var/projects
sudo groupadd projects
sudo chmod g+s /var/projects
sudo chown :projects /var/projects
sudo usermod -aG projects ${USER}
sudo chmod 775 /var/projects

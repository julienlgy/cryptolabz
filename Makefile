# CRYPTOLABZ
# EPITECH PROJECT

build: 
	sudo docker-compose build

run: 
	sudo docker-compose up

api:
	sudo docker-compose up -d api

front:
	sudo docker-compose up -d front

db:
	sudo docker-compose up -d db
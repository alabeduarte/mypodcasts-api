.PHONY: install run test open

NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

install:
	./start_docker.sh

run:
	docker-compose build app

ESLINT := $(NODE_PATH)/eslint --parser 'babel-eslint' src/** test/**
MOCHA_FLAGS := --recursive \
	--reporter spec \
	--require dotenv/config \
	--require test/helper
COMPILERS := --compilers js:babel/register
test:
	docker-compose run app $(ESLINT)
	docker-compose run -e NODE_ENV=test -e NODE_PATH=. app \
	$(NODE_PATH)/mocha \
		$(MOCHA_FLAGS) \
		$(COMPILERS)

DOCKER_IP := $(shell docker-machine ip mypodcasts-api)
open:
	open "http://$(DOCKER_IP):3000"

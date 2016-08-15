.PHONY: install run test open smoke

NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

install:
	docker-compose build
	docker-compose up -d
	./dot_env_setup.sh

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

open:
	open "http://localhost:3000"

smoke:
	docker-compose run app $(NODE_PATH)/shisha

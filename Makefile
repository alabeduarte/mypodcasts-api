NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

.PHONY: install
install:
	time ./start_docker.sh

.PHONY: run
run:
	docker-compose build app

.PHONY: test
ifdef CI
MOCHA_REPORTER := dot
else
RUNNER := docker-compose run app
MOCHA_REPORTER  := spec
endif
ifdef COVERAGE
MOCHA := $(NODE_PATH)/istanbul cover $(NODE_PATH)/_mocha --
else
MOCHA := $(NODE_PATH)/mocha
endif
ESLINT := $(NODE_PATH)/eslint --parser 'babel-eslint' src/** test/**
COMPILERS   := --compilers js:babel/register
REQUIRE_DOT_ENV := --require dotenv/config
MOCHA_FLAGS := --recursive \
	--reporter $(MOCHA_REPORTER) \
	$(REQUIRE_DOT_ENV) \
	--require test/helper
test:
	$(RUNNER) $(ESLINT)
	NODE_ENV=test \
	NODE_PATH=. time $(MOCHA) \
		$(MOCHA_FLAGS) \
		$(COMPILERS)

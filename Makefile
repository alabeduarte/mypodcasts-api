NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

.PHONY: install
install:
	time ./start_docker.sh

.PHONY: test
ESLINT := $(NODE_PATH)/eslint --parser 'babel-eslint' src/** test/**
COMPILERS   := --compilers js:babel/register
ifdef CI
NPM_INSTALL    := npm install
MOCHA_REPORTER := dot
else
MOCHA_REPORTER := spec
endif
ifdef COVERAGE
MOCHA := $(NODE_PATH)/istanbul cover $(NODE_PATH)/_mocha --
else
MOCHA := $(NODE_PATH)/mocha
endif
MOCHA_FLAGS := --recursive \
								--reporter $(MOCHA_REPORTER) \
								-r dotenv/config \
								-r test/helper
ifdef WATCH
	MOCHA_FLAGS += --watch
endif
test:
	#time docker-compose run web npm test
	$(NPM_INSTALL)
	$(ESLINT)
	time $(MOCHA) \
		$(MOCHA_FLAGS) \
		$(COMPILERS)

#:Run all tests and re-run them upon file changes
.PHONY: test.watch
test.watch:
	WATCH=true $(MAKE) test

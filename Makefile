SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

.PHONY: test

install:
	time ./start_docker.sh

test:
	#time docker-compose run web npm test
	time npm install
	./node_modules/.bin/eslint --parser 'babel-eslint' src/** test/**
	time ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- \
		--recursive \
		--reporter spec \
		--compilers js:babel/register \
		-r dotenv/config \
		-r test/helper

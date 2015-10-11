.PHONY: test

install:
	./start_docker.sh

test:
	docker-compose run web npm test

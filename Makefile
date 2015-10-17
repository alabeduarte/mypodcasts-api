.PHONY: test

install:
	time ./start_docker.sh

test:
	#time docker-compose run web npm test
	time npm test

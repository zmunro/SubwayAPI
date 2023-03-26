psql:
	docker exec -it postgres bash -c "psql db_subway -U root"

bash:
	docker exec -it subwayapi bash

test:
	docker exec -it subwayapi bash -c "npm test"

build:
	docker exec -it subwayapi bash -c "npm build:prod"

dockerbuild:
	mkdir -p pgdata
	docker-compose build

dockerup:
	docker-compose up -d

healthcheck:
	curl 127.0.0.1:3000/healthcheck

logs:
	docker logs subwayapi
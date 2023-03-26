psql:
	docker exec -it postgres bash -c "psql db_subway -U root"

bash:
	docker exec -it subwayapi bash

test:
	docker exec -it subwayapi bash -c "npm test"

build:
	docker exec -it subwayapi bash -c "npm build:prod"

dockerbuild:
	mkdir pgdata
	mkdir api/src/node_modules
	docker-compose build

dockerup:
	docker-compose up -d
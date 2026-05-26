#!make
include .env

.PHONY: start start-database start-server build clean

start:
	@echo "Run in separate terminals:"
	@echo "  make start-database"
	@echo "  make start-server"

start-database:
	docker compose up database

psql:
	docker exec -it hunter_poster-postgres psql ${DATABASE_URL}

start-server:
	npm run dev

build:
	npm run build

clean:
	rm -rf dist
	docker compose down -v

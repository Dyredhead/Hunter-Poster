.PHONY: start-database start-server build clean

start-database:
	docker compose up database

start-server:
	npm run dev

build:
	npm run build

clean:
	rm -rf dist
	docker compose down -v

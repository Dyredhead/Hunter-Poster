# root Makefile
.PHONY: setup install build start start-database start-server start-frontend clean

setup:
	$(MAKE) clean
	$(MAKE) install
	$(MAKE) build

install:
	npm install

build:
	npm run build

start:
	@echo "Run in separate terminals:"
	@echo "  make start-database"
	@echo "  make start-server"
	@echo "  make start-frontend"

start-database:
	$(MAKE) -C backend start-database

start-server:
	$(MAKE) -C backend start-server

start-frontend:
	$(MAKE) -C frontend start

clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean

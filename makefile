# root Makefile
.PHONY: setup install build start start-backend start-frontend  clean

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
	@echo "  make start-backend"
	@echo "  make start-frontend"

start-backend:
	$(MAKE) -C backend start

start-frontend:
	$(MAKE) -C frontend start

clean:
	$(MAKE) -C backend clean
	$(MAKE) -C frontend clean
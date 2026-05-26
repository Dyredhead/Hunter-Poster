# Hunter Poster
---

## Quick Start

From a fresh install, do the following:
1. Ensure you have `npm` and `docker` installed
2. Run: `make setup`
3. Then in three seperate Terminal windows:
    1. In terminal 1: `make start-frontend`
    2. In terminal 2: `make start-server`
    3. In terminal 3: `make start-database`


### Folder Structure:
- **shared**:
  - **contracts**: Contains all API contracts
- **backend**:
  - **database**: Contains all database files
  - **middleware**: Contains all middleware
  - **repositories**: Contains all files which interface between the server and database
  - **routes**: Contains implementations for all API contracts 
- **frontend**:
  - **api**: Contains implementations for all API contracts
  - **assets**: Contains reusable assets (pngs, svgs, etc.)
  - **components**: Contains reusable UI components (Navbar, etc.)

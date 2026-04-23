# Hunter Poster
---

## Quick Start

From a fresh install, do the following:
1. `make install`
2. `make build`
3. In terminal 1: `make dev-backend`
4. In terminal 2: `make dev-frontend`



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
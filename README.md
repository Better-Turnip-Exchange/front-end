## Installation

### Clone both the API and Front End.

---

- `git clone https://github.com/Better-Turnip-Exchange/front-end`
- `git clone https://github.com/Better-Turnip-Exchange/BTE-REST-API`

### Install dependencies and spin up Front End

---

- Run `npm install` to install all dependencies.
- Optional: Run `export HTTPS=true` on Mac or Linux to enable HTTPS and notifications
- Run `npm start` to spin up development server.
- Go to `localhost:3000`.

### Build and spin up API

---

- Run `make build` to setup API.
- Run `make run`.
- API will be running on port `8080`.

### Testing
---
- Run `npm test`
- After deliberately changing the UI, run `npm run update-test`

# Expense Tracker

A simple MERN-style expense tracker with a React + Vite frontend and an Express/MongoDB backend.

This repository contains two folders:

- `client/` — React + Vite frontend
- `server/` — Express backend (Node.js)

## Prerequisites

- Node.js 18+ (or latest LTS)
- npm (comes with Node)
- A MongoDB connection (Atlas or local)

## Quick start (local)

Open two terminals (PowerShell recommended) and run:

# Client
In one terminal:

```powershell
cd client
npm install
npm run dev
```

The Vite dev server will start (usually at http://localhost:5173).

# Server
In the other terminal:

```powershell
cd server
npm install
# create a .env file with the required environment variables (see below)
npm run dev
```

The backend will start (by default on port 5000 if `server.js` uses that). Adjust the port as needed.

## Environment variables

Create a `.env` file in the `server/` folder with the values your app expects. Typical variables used by this project are:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-secret-for-jwt>
EMAIL_HOST=<smtp-host-if-app-uses-email>
EMAIL_PORT=<smtp-port>
EMAIL_USER=<smtp-username>
EMAIL_PASS=<smtp-password>
```

Keep `.env` out of version control (a `.gitignore` entry was added).

## Scripts

Client (`client/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview production build

Server (`server/package.json`)

- `npm run dev` — start backend with `nodemon`
- `npm start` — start backend with `node server.js`

## Tests

No automated tests are included.

## Notes

- I added a basic `.gitignore` and removed `node_modules` from tracking. If you'd like changes to what is ignored, tell me what to include.
- The repository currently contains the client and server code. Adjust CORS or API base URLs in the client if your backend runs on a non-default port.

## Troubleshooting

- If `npm run dev` fails, make sure dependencies are installed in the respective folder and Node version is compatible.
- If the server can't connect to MongoDB, verify `MONGO_URI` and network access (Atlas IP allowlist).

## Contributing

Feel free to open issues or create branches for features. I can also help add CI, Docker, or tests as next steps.

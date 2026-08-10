# Deployment

The Coffee Brew Log application is intended to be deployed with the frontend and backend as separate services.

## Frontend

The React/Vite frontend can be deployed to Vercel.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

The frontend requires the backend API URL to be configured for the deployed environment.

## Backend

The Express API can be deployed to Render or another Node.js hosting service.

The backend requires:

```env
PORT=5050
DATABASE_URL="file:./dev.db"
```

## Local Development

The application was tested locally with:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5050`
* Health check: `http://localhost:5050/api/health`

## Deployment Status

Deployment URL will be added here after the production deployment has been completed.

## Troubleshooting

The backend was initially tested on port 5000. The port was changed to 5050 to avoid a conflict with a service already using port 5000 on the development machine.

The backend API was then verified using the `/api/health` endpoint and `curl`.

Prisma was configured with SQLite for local development.

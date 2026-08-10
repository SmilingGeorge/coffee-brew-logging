# Deployment

The Coffee Brew Log application is deployed with the frontend and backend as separate services.

## Frontend

The React/Vite frontend is deployed on Vercel.

The frontend communicates with the deployed Express API.

## Backend

The Express API is deployed on Render.

Backend URL:

https://coffee-brew-api-uiys.onrender.com

Health check:

https://coffee-brew-api-uiys.onrender.com/api/health

## Database

The application uses PostgreSQL hosted on Supabase.

Prisma is used as the ORM.

The production database connection is provided through the `DATABASE_URL` environment variable.

Database credentials are not committed to the repository.

## Local Development

The application was tested locally with:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5050`
- Health check: `http://localhost:5050/api/health`

## Deployment Configuration

### Frontend

The Vite frontend can be deployed to Vercel.

Build command:

```bash
npm run build
# Coffee Brew Log

A full-stack Coffee Brew Log application built for the XPL Full-stack Developer Bootcamp assessment.

## Features

* Create a brew entry
* View saved brews
* Filter brews by brew method
* Edit an existing brew
* Delete a brew
* Validate required fields

## Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express
* Prisma ORM
* SQLite

## Project Structure

```text
coffee-brew-log/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   ├── routes/
│   │   │   └── brews.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BrewFilter.jsx
│   │   │   └── BrewForm.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── Documentation.md
├── deployment.md
└── .gitignore
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run dev
```

The backend runs on:

```text
http://localhost:5050
```

Health check:

```text
http://localhost:5050/api/health
```

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

## Environment Variables

Create `backend/.env` from `.env.example`.

```env
PORT=5050
DATABASE_URL="file:./dev.db"
```

The `.env` file and local SQLite database are excluded from Git.

## API Endpoints

| Method | Endpoint                | Purpose       |
| ------ | ----------------------- | ------------- |
| GET    | `/api/brews`            | Get all brews |
| GET    | `/api/brews?method=V60` | Filter brews  |
| POST   | `/api/brews`            | Create a brew |
| PUT    | `/api/brews/:id`        | Update a brew |
| DELETE | `/api/brews/:id`        | Delete a brew |

## Validation

The frontend prevents the create and edit forms from being submitted when required fields are blank.

The backend also validates all required fields before creating or updating a database record.

The API returns appropriate HTTP status codes:

* `200` — successful request
* `201` — brew created
* `400` — required fields missing
* `404` — brew not found
* `500` — server/database error

## Database

The application uses SQLite with Prisma ORM.

The Prisma schema is located at:

```text
backend/prisma/schema.prisma
```

The local database file is intentionally excluded from version control.

## Running the Full Application

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open the frontend URL provided by Vite.

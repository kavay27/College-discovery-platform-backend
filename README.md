# College Discovery Platform

Backend MVP for a college discovery and decision-making platform.

## Stack

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM

## Implemented Features

- College listing with search, filters, sorting, and pagination
- College detail API with courses, placements, and reviews
- College comparison API for 2-3 colleges
- Rank-based college predictor API
- Swagger/OpenAPI documentation
- Prisma schema and seed data

## Project Scope

This project intentionally focuses on backend quality instead of building a full marketplace.
The implemented feature set demonstrates:

- Search APIs
- Filtering systems
- Pagination
- Database modeling
- Validation systems
- REST API quality

All college, course, placement, review, exam, and cutoff data is read from PostgreSQL through Prisma.

## Setup

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run start:dev
```

If the global `npm` shim is broken on Windows, use:

```bash
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run start:dev
```

## Database

Create a PostgreSQL database and set `DATABASE_URL` in `.env`.

Generate Prisma client:

```bash
npm run prisma:generate
```

Run migrations:

```bash
npm run prisma:migrate
```

Seed mock data:

```bash
npm run prisma:seed
```

Run this again after seed data changes to refresh the local demo dataset.

## API Examples

| Feature | Method | Endpoint |
| --- | --- | --- |
| Health check | `GET` | `/api/health` |
| College listing | `GET` | `/api/colleges` |
| College detail | `GET` | `/api/colleges/:id` |
| Compare colleges | `GET` | `/api/colleges/compare?ids=1,2` |
| Predictor | `GET` | `/api/predictor?exam=jee-main&rank=1000&category=GENERAL` |

Health check:

```txt
GET /api/health
```

College search:

```txt
GET /api/colleges?search=engineering&city=Pune&minFees=100000&maxFees=300000&page=1&limit=10&sortBy=rating&sortOrder=desc
```

College detail:

```txt
GET /api/colleges/1
```

Compare colleges:

```txt
GET /api/colleges/compare?ids=1,2,3
```

Predictor:

```txt
GET /api/predictor?exam=jee-main&rank=1000&category=GENERAL&stream=Engineering&page=1&limit=10
```

Swagger docs:

```txt
GET /api/docs
```

## Deployment

This API can be deployed as a Node web service on Render, Railway, or a similar platform.

For Render, use:

```txt
Build Command: npm install && npm run prisma:generate && npm run build
Start Command: npm run prisma:deploy && npm run start:prod
Health Check Path: /api/health
```

Required environment variable:

```txt
DATABASE_URL=<hosted-postgresql-connection-string>
```

After the first deployment, seed the hosted database once:

```bash
npm run prisma:seed
```

Public API documentation will be available at:

```txt
https://your-deployed-service-url/api/docs
```

## Backend Highlights

- PostgreSQL-backed data model with Prisma relations
- Server-side search, filtering, sorting, and pagination
- DTO-based request validation using NestJS validation pipes
- REST APIs for listings, details, comparisons, and rank prediction
- Rank predictor powered by cutoff records in the database
- Swagger/OpenAPI documentation with request parameters and response schemas
- Seeded demo dataset for local testing

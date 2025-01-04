# Project Name

Brief description of what your project does and its main features.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL (or your database of choice)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:
```bash
npm install
```

3. Environment Setup:
   - Create a `.env` file in the root directory
   - Copy the contents from `.env.example` (if available)
   - Update the database connection string and other environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

## Database Setup

This project uses Prisma as the ORM. The Prisma schema is located in `src/prisma/schema.prisma`.

1. Generate Prisma Client:
```bash
npm run prisma:generate
```

2. Run database migrations:
```bash
npm run prisma:migrate:dev
```

## Available Scripts

- `npm run dev`: Starts the development server with hot-reload
- `npm run build`: Compiles TypeScript code to JavaScript
- `npm start`: Runs the compiled application in production mode
- `npm run prisma:generate`: Generates Prisma Client
- `npm run prisma:migrate:dev`: Runs database migrations for development
- `npm run prisma:migrate:deploy`: Deploys migrations to production
- `npm run prisma:studio`: Opens Prisma Studio to view and edit data

## Development Workflow

1. Make sure your database is running
2. Set up your environment variables
3. Generate Prisma Client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate:dev
```
4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:[PORT]` (default port specified in your .env file)

## Database Management

- To create new migrations after schema changes:
```bash
npm run prisma:migrate:dev
```

- To view and edit data through Prisma Studio:
```bash
npm run prisma:studio
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy migrations:
```bash
npm run prisma:migrate:deploy
```

3. Start the server:
```bash
npm start
```

## Project Structure

```
src/
├── prisma/
│   └── schema.prisma
├── routes/
├── controllers/
├── services/
├── middleware/
└── server.ts
```

## Additional Notes

- The Prisma schema is located in `src/prisma/schema.prisma`
- Make sure to run migrations before starting the development server
- Always backup your database before running migrations in production

## Troubleshooting

Common issues and their solutions:

1. **Prisma Client Generation Issues**
   - Delete `node_modules/.prisma` and re-run `npm run prisma:generate`

2. **Migration Issues**
   - Check your database connection string in `.env`
   - Ensure your database is running
   - Try resetting the database with `npx prisma migrate reset`

## Contributing


## License


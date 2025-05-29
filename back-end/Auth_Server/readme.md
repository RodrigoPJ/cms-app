# Backend API with Express, TypeORM, and PostgreSQL

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [Validation](#validation)
- [License](#license)

## Description

This project is a RESTful backend API built using **Express** and **TypeORM** with **PostgreSQL** as the database. It provides basic user management functionality, including account creation, user listing, and authentication.

## Features

- User registration with server‑side validation
- User login (email + password)
- One‑to‑one relation between `User` and `UserAccount`
- Database migrations and schema synchronization
- Built in TypeScript for type safety
- Environment‑based configuration

## Prerequisites

- Node.js (>= 16)
- npm or yarn
- PostgreSQL (>= 10)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd back-end
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Configuration

1. Copy the provided `.env` file or create a new one in the project root:
   ```bash
   cp .env.example .env
   ```
2. Update the values to match your environment:
   ```dotenv
   DB_HOST=localhost        # database host
   DB_PORT=5666             # database port
   DB_USER=postgres         # database user
   DB_PASS=your_password    # database password
   DB_NAME=postgres         # database name
   PORT=3000                # application port
   environment=local        # running environment
   JWT_SECRET="secret word"
   ```

## Database Setup

1. Ensure your PostgreSQL server is running and the database specified in `DB_NAME` exists.
2. Run database migrations:
   ```bash
   npm run migration:generate
   npm run migration:run
   ```
   Or rely on automatic synchronization (not recommended for production):
   - The `AppDataSource` is configured with `synchronize: true` and will auto‑create tables on startup.

## Running the Application

- **Development mode** (with live reload):
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm run build
  node dist/server.js
  ```

## Available Scripts

| Command                      | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `npm run dev`                | Start server with nodemon & ts-node         |
| `npm run build`              | Compile TypeScript to JavaScript in `dist/` |
| `npm run migration:generate` | Generate a new migration (specify name)     |
| `npm run migration:run`      | Apply pending migrations to the database    |
| `npm run typeorm`            | Run any TypeORM CLI command                 |

## API Endpoints

### GET `/api/getUsers`

- **Description**: Retrieve all registered users.
- **Response**: 200 OK
  ```json
  [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "account": "<UserAccount id>"
    }
  ]
  ```

### POST `/api/add-user`

- **Description**: Create a new user with an associated account.
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "age": 25,
    "email": "jane.smith@example.com",
    "password": "securePassword123",
    "createDate": "2025-05-01T00:00:00.000Z"
  }
  ```
- **Response**: 200 OK
  ```json
  {
    "savedData": { /* UserAuth entity */ },
    "savedAccount": { /* UserAccount entity */ }
  }
  ```
- **Errors**:
  - 400 Bad Request — validation errors
  - 404 Not Found — missing JSON content

### POST `/api/login`

- **Description**: Authenticate a user.
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "jane.smith@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  - 200 OK — login successful (returns user data)
  - 401 Unauthorized — incorrect credentials
  - 404 Not Found — user not found

## Project Structure

```
back-end/
├── src/
│   ├── app.ts               # Express application setup
│   ├── server.ts            # DB initialization & server start
│   ├── db-config/
│   │   ├── data-source.ts   # TypeORM DataSource configuration
│   │   └── entity/
│   │       ├── UserAuth.ts  # User entity definition
│   │       └── UserAccount.ts # Account entity definition
│   ├── migrations/          # TypeORM migration scripts
│   ├── controllers/         # Request handlers
│   │   ├── saveNewUser.ts
│   │   ├── getAllUsers.ts
│   │   └── loginUser.ts
│   ├── routes/              # Route definitions
│   └── utils/
│       └── validators/      # class-validator schemas
├── dist/                    # Compiled JS output
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript config
├── package.json
└── README.md                # <-- You are here
```

## Data Models

- **User** (`UserAuth` entity)

  - `id`: uuid (primary key)
  - `firstName`, `lastName`: string
  - `age`: number
  - `email`, `password`: string
  - `account`: relation to `UserAccount`

- **UserAccount** (`UserAccount` entity)

  - `id`: uuid (primary key)
  - `type`: string (e.g., `free`)
  - `projects`: JSON stringified project list

## Validation

User input is validated using `class-validator`:

- `firstName` & `lastName`: length 1–24 characters
- `age`: integer within configured range
- `email`: valid email format
- `password`: length and complexity constraints

## License

This project is licensed under the **ISC** License. Feel free to use and modify as needed.

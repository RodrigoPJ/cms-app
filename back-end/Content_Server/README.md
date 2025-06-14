# Content Server

This microservice handles all content management for the CMS App.

## Overview

The Content Server provides RESTful endpoints to manage:

- **Users**: Admin endpoints to list and retrieve user accounts.
- **Projects**: Grouping of content (ProjectList and ProjectItem).
- **Content**: Actual content items (ProjectContent) associated with projects.
- **Admin Listings**: Retrieve all projects and all content.

Built with Node.js, TypeScript, Express, TypeORM, and PostgreSQL.

## Features

- **User Management (Admin)**
  - List all users
  - Retrieve a single user

- **Project Management**
  - Create a new project
  - List all projects (optionally by user)
  - Retrieve project details with content

- **Content Management**
  - Post new content for a project
  - Retrieve content items by project
  - List all content items (Admin)

- **Validation**: Request payloads validated via `class-validator`.
- **Authentication**: Protected endpoints (future integration with Auth Server).
- **Logging**: Request logs and errors printed to console (consider Winston for production).

## Tech Stack

- **Node.js** v16+
- **TypeScript**
- **Express**
- **TypeORM**
- **PostgreSQL**
- **class-validator** for input validation
- **Multer** (if file uploads are enabled)
- **dotenv** for environment variables

## Getting Started

### Prerequisites

- **Node.js** and **npm** (or Yarn)
- **PostgreSQL** database

### Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd Content_Server
    ```

2. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure Environment**:
   - Copy `.env.example` to `.env` and set the following variables:

     ```env
     PORT=5000
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=postgres
     DB_PASS=<your_db_password>
     DB_NAME=cms_content
     JWT_PUBLIC_KEY_PATH=../auth-server/keys/public.pem  # If integrating with Auth Server
     ```

   - Adjust values as needed.

4. **Run Database Migrations**:

    ```bash
    npm run migration:run
    ```

5. **Start the Server**:

    ```bash
    npm run dev         # Development (with hot reload)
    npm run build       # Compile TypeScript
    npm run start:prod  # Production mode (after build)
    ```

The server will run on `http://localhost:5000` by default.

## Database Entities

### User

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;      // hashed password

  @Column('varchar')
  userName: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: string;

  @Column('varchar')
  userType: string;      // e.g., 'admin' or 'regular'

  @OneToOne(() => ProjectList)
  @JoinColumn()
  projectListId: ProjectList;   // One-to-one link to ProjectList
}
```

### ProjectList

```ts
@Entity()
export class ProjectList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;                 // Name of the project list

  @Column('varchar')
  contentType: string;          // e.g., 'blog', 'docs', etc.

  @OneToMany(() => ProjectItem, item => item.projectListId)
  items: ProjectItem[];
}
```

### ProjectItem

```ts
@Entity()
export class ProjectItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProjectList, list => list.id)
  projectListId: string;        // FK to ProjectList

  @Column('varchar')
  name: string;                 // Name of the individual project

  @Column('varchar')
  contentType: string;          // e.g., 'article', 'page', etc.

  @OneToMany(() => ProjectContent, content => content.projectItemId)
  contents: ProjectContent[];
}
```

### ProjectContent

```ts
@Entity()
export class ProjectContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: string;                 // e.g., 'article', 'image', etc.

  @Column('varchar')
  title: string;

  @Column('text')
  body: string;

  @Column('varchar')
  properties: string;           // JSON-stringified metadata

  @ManyToOne(() => ProjectItem, item => item.id)
  @Column('uuid')
  projectItemId: string;        // FK to ProjectItem
}
```

## API Endpoints

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

List of endpoints:

- GET /admin/get-users
- GET /admin/get-user (expects body { account: string })
- GET /admin/get-all-projects
- GET /admin/get-all-content
- POST /admin/create-user  (createNewUser)
- POST /projects          (createNewProject)
- GET /projects           (getProjectList)
- POST /project-content   (postContent)
- GET /project-content    (getProject)
- **GET /content/pages**: List pages  
- **GET /content/pages/:id**: Get page by ID  
- **POST /content/pages**: Create page  
- **PUT /content/pages/:id**: Update page  
- **DELETE /content/pages/:id**: Delete page  
- Similar endpoints for **/content/posts**

## Error Handling

- Validation errors return **400 Bad Request** with an array of constraint violations.
- Authentication/Authorization errors return **401 Unauthorized** or **403 Forbidden**.
- Database errors return **500 Internal Server Error**.

## Logging

Basic `console.log` statements are included. For production use, integrate a structured logger such as **Winston** or **Pino**.

## License

MIT

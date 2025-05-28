# Content Server

This microservice handles all content management APIs for the CMS App.

## Features
- CRUD for pages and posts
- Pagination & filtering
- File/image uploads via Multer
- Protected endpoints with JWT validation
- Role-based access control (optional)

## Tech Stack
- Node.js & TypeScript
- Express
- TypeORM
- PostgreSQL
- Multer
- class-validator

## Quickstart

1. Install dependencies:
   ```bash
   cd content-server
   npm install
   ```

2. Copy and configure `.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=your_password
   DB_NAME=cms_content
   JWT_PUBLIC_KEY_PATH=../auth-server/keys/public.pem
   ```

3. Run migrations:
   ```bash
   npm run migration:run
   ```

4. Start server:
   ```bash
   npm run dev   # development
   npm run build && node dist/server.js   # production
   ```

## API Endpoints

- **GET /content/pages**: List pages  
- **GET /content/pages/:id**: Get page by ID  
- **POST /content/pages**: Create page  
- **PUT /content/pages/:id**: Update page  
- **DELETE /content/pages/:id**: Delete page  
- Similar endpoints for **/content/posts**

## License
MIT

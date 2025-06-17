# Front-End CMS Application with React, TypeScript, Vite & Tailwind CSS

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Styling & UI](#styling--ui)
- [State Management](#state-management)
- [Routing](#routing)
- [Deployment](#deployment)
- [Services & API Integration](#services--api-integration)
- [License](#license)

## Description

This is the front-end client for the CMS App — a content management and sales dashboard platform. It’s built with:

- **React** (v19.1) for the UI
- **TypeScript** for static typing
- **Vite** as the build tool and dev server
- **Tailwind CSS** and **DaisyUI** for utility-first styling and components
- **Redux Toolkit** for application state
- **React Router v7** for client-side routing
- **Tanstack Query** for server side state handling

The UI provides authentication (mocked), a public home page, and a protected dashboard with content, user management, and settings panels.

## Features

- **Authentication flow** (login/logout) with mock services
- **Public pages**: Home, Login, SignUp
- **Protected dashboard**:
  - Sidebar navigation
  - Dashboard overview panel
  - Content management section
  - User management section
  - Settings page
- **Account settings** page with profile form and danger zone
- **Responsive design** optimized for desktop and mobile
- **Dark/light theme toggling** (via Tailwind/DaisyUI)
- **GitHub Pages** Optimized static build support [check it out](https://rodrigopj.github.io/cms-app/)
- **FontAwesome** icon integration

## Prerequisites

- Node.js v16 or higher
- npm v8+ or Yarn v1.22+

## Project Setup

1. **Clone the repository** and navigate to the front-end folder:

   ```bash
   git clone https://github.com/RodrigoPJ/cms-app.git
   cd cms-app/react-client-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the dev server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [localhost:5176](http://localhost:5173/)

## Configuration

- No `.env` file is required by default — mock services are used for basic dummy data.

## Environment Variables

There are two main environment files used:

- `.env` – used during **local development**. Configure actual API endpoints and AWS credentials for uploads.
- `.env.github` – used when building for **GitHub Pages**, with dummy/fake values to make it a static, standalone UI.

Example:

```env
VITE_Back_End_type = fake # or local or prod depending on the case
VITE_SERVER_auth = http://localhost:3000
VITE_SERVER_content = http://localhost:3001
```

For GitHub:

```env
VITE_BUILD_TARGET=github
```

## Available Scripts

```json
{
  "dev": "vite",
  "tsc": "tsc -b",
  "vite:build": "vite build",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "build:github": "tsc -b && vite build --outDir ../../docs --base '/cms-app' --emptyOutDir -- --mode github"
}
```

| Command                | Description                           |
| -----------------------|-------------------------------------- |
| `npm run dev`          | Start Vite dev server (hot-reload)    |
| `npm run build`        | Build for production (outputs `dist`) |
| `npm run preview`      | Preview production build locally      |
| `npm run lint`         | Run ESLint on all `.ts/.tsx` files    |
| `npm run preview`      | Serves the production build           |
| `npm run build:github` | GitHub Pages-compatible build         |

### Key Script

- **`build:github`**  
  Prepares a GitHub Pages-compatible build:
  - Sets base path to `/cms-app`
  - Outputs to `../../docs` (you can change this as needed)
  - Uses `.env.github` values to produce a fully static build

```bash
npm run build:github
```

## Deployment

### ✅ GitHub Pages

1. Ensure the `docs/` folder is being used for GitHub Pages
2. Run:

   ```bash
   npm run build:github
   ```

3. Push to the default branch `develop`

4. Enable GitHub Pages to serve from `/docs`

### ✅ Local + Backend

If you're running the app locally with backend:

- Make sure `.env` is configured properly
- Start the backend server
- Run:

```bash
npm run dev
```

The app will work with full API and upload support.

## Project Structure

```
react-client-app/
├── dist/                # build for prod
│   └── index.html       # Main HTML file
├── docs/                # build for github
├── src/
│   ├── assets/          # Images, fonts, icons
│   ├── components/      # Reusable UI components (Header, LoginForm, Hero, Card)
│   ├── pages/           # Route-level pages (Home, Login, Dashboard, Account, Logout)
│   ├── services/        # Mock data & UI services (AuthService, logData-service)
│   ├── utils/
│   │   ├── store/       # Redux Toolkit slice & store hooks
│   │   └── router/      # React Router setup and route definitions
│   ├── index.css        # Tailwind & DaisyUI imports
│   ├── App.tsx          # Application root with routes
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Vite TypeScript definitions
├── .gitignore
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # TS config for app
├── tsconfig.node.json   # TS config for Node
├── eslint.config.js     # ESLint configuration
└── vite.config.ts       # Vite configuration
```

## Styling & UI

- **Tailwind CSS** with `@tailwindcss/vite` plugin for utility-first styles
- **DaisyUI** plugin for pre-built, themeable components
- **FontAwesome** icons via `@fortawesome/react-fontawesome`

## State Management

- **Redux Toolkit** & **React Redux** for global UI state (e.g., auth, theme)
- Custom hooks in `src/utils/store/hooks.ts`

## Routing

- **React Router v7** for nested and protected routes
- Route definitions in `src/utils/router/routes.tsx`

## Services & API Integration

- **Mock auth service** in `src/services/ui-service/AuthService.ts`
- **Mock data service** in `src/services/data/logData-service.ts`
- To connect to a real API, replace mock implementations with `fetch` or `axios` calls using `VITE_API_BASE_URL`.

## License

This front-end client is licensed under the **MIT License**. See the [LICENSE](../LICENSE) file for details.

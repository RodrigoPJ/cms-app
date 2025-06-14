# CMS App

A modern, full-stack content management system built with React, Vite, Tailwind CSS, DaisyUI, Redux, and Node.js (backend in progress). Designed to be fast, responsive, and developer-friendly with a clean UI and scalable architecture.

## 🧱 Project Structure

```shell
cms-app/
├── front-end/       # React + Vite + Tailwind CMS UI
├── back-end/        # Node.js/Express server (WIP)
├── start.sh         # Example script to launch app
└── README.md
```

---

## 🚀 Features

### Frontend

- ⚛️ Built with React (Vite) + TypeScript
- 🎨 Styled with Tailwind CSS and DaisyUI
- 🌐 Client-side routing with React Router
- 📦 Global state with Redux Toolkit
- 🔐 Basic login/logout flow (mocked for now)
- 🎨 Responsive admin dashboard layout
- 🎯 Icons via Font Awesome

### Backend

- 🚀 Express + Node.js REST API
- 🌐 Node Microservices
- 🔐  JWT Authentication
- 💾  PostgreSQL integration
- 📁 CMS endpoints for managing content/users

---

## 🛠️ Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- PostgreSQL running locally

---

### 📦 Frontend Setup

```bash
cd front-end
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 🖥️ Backend Setup

This will run both BE services, Auth and Content.

```bash

cd back-end
npm install
npm run start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Breakdown (Frontend)

| Folder           | Purpose                               |
|------------------|----------------------------------------|
| `/components`    | Reusable UI components                 |
| `/pages`         | Route-level components (dashboard, etc)|
| `/redux`         | Redux slices and store config          |
| `/assets`        | Static assets (images, icons, etc)     |

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙋 Author

Developed by [RodrigoPJ](https://github.com/RodrigoPJ)

---

## 🧭 Future Plans

- [ ] Full CRUD API
- [ ] Upload support for media
- [ ] Analytics and role-based access

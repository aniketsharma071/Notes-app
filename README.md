
# 📝 Notes App

A full-stack Notes application built with **Next.js**, **TypeScript**, **MongoDB**, and **Mongoose**. The project also includes **Docker** support for easy development and deployment.

## 🚀 Features

- Create new notes
- View all notes
- Edit existing notes
- Delete notes
- MongoDB Atlas integration
- RESTful API using Next.js App Router
- Docker support with Docker Compose

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Containerization:** Docker, Docker Compose

## 📂 Project Structure

```text

src/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── notes/
│   │   ├── page.tsx
│   │   ├── create/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── mongoDB.ts
└── models/
   └── Notes.ts


```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/aniketsharma071/Notes-app.git
cd Notes-app
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run the development server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

## 🐳 Running with Docker

This project can also be run using Docker and Docker Compose.

### Build and start the containers

```bash
docker compose up --build
```

The application will be available at:

```text
http://localhost:3000
```

### Stop the containers

```bash
docker compose down
```

MongoDB runs in a separate Docker container, and the database is persisted using a Docker volume.

##  📚 About
- This project was created as a learning exercise to practice building a full-stack CRUD application using Next.js and MongoDB.
- Built purely for fun and to pass some time. If it breaks, try refreshing!

Made with ☕ and boredom.

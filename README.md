# MERN Stack TaskMaster Application

A complete, modern, and responsive Todo application built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **User Authentication:** Secure JWT-based authentication with user registration and login.
- **Task Management:** Create, read, update, delete, and toggle tasks.
- **Dashboard:** View overall progress and statistics on task completion.
- **Modern UI:** Responsive, sleek dark mode design built with Tailwind CSS.
- **State Management:** React Context API for global state.

## Project Structure
- `frontend/`: React application built with Vite and Tailwind CSS.
- `backend/`: Node.js/Express REST API.

## Prerequisites
- Node.js (v18+)
- MongoDB connection string (local or Atlas)

## Getting Started

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Make sure you update the `MONGO_URI` in `backend/.env` with your actual MongoDB connection string.
4. Run the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Running Both Concurrently (Root)
From the root directory of the project, you can install dependencies and run both servers simultaneously:
```bash
npm install
npm run dev
```

## Seeding Dummy Data
To populate your database with some dummy users and tasks for testing:
```bash
cd backend
npm run data:import
```
*Note: This will clear existing data in the database.*

## Tech Stack
- **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Context API, Axios, React Hot Toast, Lucide React (Icons).
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

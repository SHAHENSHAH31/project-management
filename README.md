#  Project Management Tool (Fullstack)

This is a fullstack Project Management application where users can create, update, delete projects and tasks. The system includes user authentication and protected routes.

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)

---

##  Project Structure

project-management/
├── frontend/ # React + Vite (Client)
├── backend/ # Node.js + Express + MongoDB (API)

yaml
Copy
Edit

---

## 🚀 How to Run

### 1️⃣ Backend Setup

```bash
cd backend
npm install
Create a .env file inside backend folder:

ini
Copy
Edit
PORT=4000
MONGO_URI=mongodb://localhost:27017/project-management
JWT_SECRET=your_secret_key
Start the backend:

bash
Copy
Edit
npm run dev
API runs on http://localhost:4000/api

2️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install



Start the frontend:

bash
Copy
Edit
npm run dev

# 🚀 MERN Task Manager

A full-stack Task Management application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. This application allows users to securely manage their daily tasks with authentication, CRUD operations, search, filtering, sorting, and task statistics.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### ✅ Task Management
- Create Task
- View All Tasks
- View Single Task
- Update Task
- Delete Task

### 🔍 Search & Filter
- Search tasks by title or description
- Filter by:
  - Completed
  - Pending

### 📅 Sorting
- Newest
- Oldest
- Due Date
- Priority

### 📊 Dashboard Statistics
- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks

### ✔️ Validation
- Email Validation
- Password Validation
- Task Validation
- Global Error Handling

---

# 🛠 Tech Stack

## Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator
- Express Async Handler

---

# 📂 Project Structure

```
task-manager-mern
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/DMOHIT07/task_manager-mern.git
```

```bash
cd task_manager-mern
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder.

```env
PORT=5001

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5001
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/profile` | Get User Profile |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| POST | `/api/tasks` |
| GET | `/api/tasks` |
| GET | `/api/tasks/:id` |
| PUT | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |
| GET | `/api/tasks/stats` |

---

# 📷 Screenshots

You can add screenshots here after deployment.

Example:

```
Login Page

Dashboard

Task List
```

---

# 🚀 Deployment

### Backend

Render

### Frontend

Vercel

---

# 📈 Future Improvements

- Dark Mode
- Drag & Drop Tasks
- Task Categories
- Email Notifications
- File Attachments
- User Profile
- Pagination
- Real-time Updates

---

# 👨‍💻 Author

**Mohit Yadav**

GitHub:
https://github.com/DMOHIT07

---

# 📄 License

This project is developed for learning and educational purposes.

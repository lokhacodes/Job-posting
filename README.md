# Job Posting Application

A full-stack job posting platform with React frontend and Node.js/Express backend.

## Features

### Frontend (React + Vite + Tailwind CSS)
- **Job Listings Page**: Browse all jobs with search and filter functionality
- **Job Detail Page**: View full job descriptions and apply
- **Apply Now Form**: Submit applications with name, email, resume link, and cover note
- **Admin Panel**: Add and delete job listings
- **Responsive Design**: Works on all device sizes

### Backend (Node.js + Express + MongoDB)
- RESTful API with the following endpoints:
  - `GET /api/jobs` - List all jobs (with search & filter)
  - `GET /api/jobs/:id` - Get single job details
  - `POST /api/jobs` - Create new job (Admin)
  - `DELETE /api/jobs/:id` - Delete job (Admin)
  - `POST /api/applications` - Submit job application
- Input validation on all endpoints
- Email format validation
- URL validation for resume links

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Project Structure

```
job-posting/
├── backend/
│   ├── config.js          # Configuration
│   ├── index.js           # Express app entry point
│   ├── models/
│   │   ├── Job.js         # Job model
│   │   └── Applications.js # Application model
│   ├── routes/
│   │   ├── jobRoutes.js         # Job API routes
│   │   └── applicationRoutes.js # Application API routes
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js     # API client
    │   ├── components/    # Reusable components
    │   │   ├── JobCard.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Jobs.jsx
    │   │   ├── JobDetail.jsx
    │   │   └── Admin.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## Installation & Setup

### 1. Clone the repository

```
bash
cd job-posting
```

### 2. Backend Setup

```
bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# Example: MONGO_URL=mongodb://localhost:27017/jobposting

# Start the backend server
npm start
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

Open a new terminal:

```
bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your API URL
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (supports `search`, `location`, `category` query params) |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create new job (Admin) |
| PUT | `/api/jobs/:id` | Update job (Admin) |
| DELETE | `/api/jobs/:id` | Delete job (Admin) |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get all applications (Admin) |
| POST | `/api/applications` | Submit job application |

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/jobposting
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **HTTP Client**: Axios

## License

MIT

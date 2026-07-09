# Weekly Report Generator & Team Dashboard

A full-stack web application that allows team members to submit structured weekly work reports and enables managers to monitor, analyze, and manage team progress through dashboards, filters, analytics, and AI-assisted insights.

---

# Features

## Authentication & Role Management

- User registration and login
- JWT-based authentication
- Secure password hashing
- Role-based access control
- Two user roles:
  - Team Member
  - Manager

## Team Member Features

- Personal dashboard
- Create weekly reports
- Select assigned projects
- Edit draft reports
- Submit reports
- Submitted reports cannot be edited
- View report history
- Track personal report statistics

## Manager Features

- Manager dashboard
- View all team reports
- Filter reports by:
  - Member
  - Project
  - Date range
- Track submission status
- Manage projects
- Assign members to projects
- View team analytics

## Dashboard Analytics

Manager dashboard includes:

- Total reports
- Submitted reports
- Pending reports
- Submission compliance rate
- Open blockers count

Visualizations:

- Report submission status chart
- Workload distribution by project
- Task completion trend
- Recent activity feed

## AI Assistant

Integrated AI chat assistant using Google Gemini API.

Capabilities:

- Answer questions about team activity
- Provide summaries based on reports
- Assist managers in understanding team progress

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

## AI Integration

- Google Gemini API

---

# System Architecture

```
React Frontend
        |
        |
      Axios
        |
        |
Express REST API
        |
        |
Prisma ORM
        |
        |
PostgreSQL Database
```

---

# Database Design

Main entities:

## User

Stores authentication and role information.

Fields:

- id
- name
- email
- password
- role

## Project

Stores team projects/categories.

Fields:

- id
- name
- description

## UserProject

Many-to-many relationship between users and projects.

Fields:

- userId
- projectId

## Report

Stores weekly team reports.

Fields:

- id
- userId
- projectId
- weekStartDate
- weekEndDate
- tasksCompleted
- tasksPlanned
- blockers
- hoursWorked
- notes
- status

Relationship:

```
User
 |
 |
UserProject
 |
 |
Project
 |
 |
Report
```

---

# Project Structure

## Frontend

```
frontend
│
├── src
│   |
│   ├── components
│   |
│   ├── pages
│   │    ├── manager
│   │    └── member
│   |
│   ├── services
│   |
│   ├── context
│   |
│   └── routes
│
└── package.json
```

## Backend

```
backend
│
├── controllers
│
├── routes
│
├── middleware
│
├── prisma
│
├── services
│
├── server.js
│
└── package.json
```

---

# Installation & Setup

## Prerequisites

Install:

- Node.js
- PostgreSQL

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
.env
```

Example:

```env
DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_secret_key"

GEMINI_API_KEY="your_gemini_api_key"
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5001
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Overview

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Reports

```
POST /api/reports

GET /api/reports/my

GET /api/reports/:id

PUT /api/reports/:id

PATCH /api/reports/:id/submit
```

## Projects

```
GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id
```

## Manager APIs

```
GET /api/manager/reports

GET /api/manager/reports/filter

GET /api/manager/dashboard
```

---

# Security

Implemented:

- JWT authentication
- Protected API routes
- Role-based authorization middleware
- Password hashing
- User-specific report access

---

# AI Assistant Approach

The application integrates Google Gemini API for AI-assisted features.

Flow:

```
User
 |
 |
Chat Widget
 |
 |
Backend AI Controller
 |
 |
Gemini API
 |
 |
Response
```

Privacy considerations:

- API keys are stored securely using environment variables
- User passwords are never shared with AI services
- Sensitive authentication data remains inside the application database

---

# Future Improvements

Possible improvements:

- Email notifications for missing reports
- Advanced AI-generated team summaries
- Export reports as PDF
- More detailed analytics
- Real-time notifications
- Admin user management

# Task Time Tracker

A full-stack productivity web application that helps users organise tasks, track productive study/work sessions, monitor distractions, and visualise long-term progress.

# Purpose

The aim of this project is to help users better understand how they spend their time.

Unlike traditional task managers, the application distinguishes between:

* **Productive time**
* **Distraction time**

allowing users to accurately measure how much focused work they complete throughout each day.

Users can customise their own productivity thresholds (for example 2h, 4h, 6h, 8h) which are reflected throughout the application using a colour-coded calendar.

---

## Screenshots

### Home Page (Logged In)

<img width="1920" alt="Home Logged In" src="https://github.com/user-attachments/assets/feae0144-0e3a-43db-ae86-60aa9aae170c" />

### Home Page (Logged Out)

<img width="1920" alt="Home Logged Out" src="https://github.com/user-attachments/assets/41f5d5e8-c07b-4355-8d07-4e1bd600686f" />

### Timetable

<img width="1920" alt="Timetable" src="https://github.com/user-attachments/assets/23cd51f2-6527-41f3-99b1-998f18d956d2" />

### Calendar

<img width="1920" alt="Calendar" src="https://github.com/user-attachments/assets/116b40c4-46a8-4194-a0e6-e085b7b4adc2" />

### Settings

<img width="1920" alt="Settings" src="https://github.com/user-attachments/assets/f764719f-dea0-4817-833d-f08fa311704d" />

---

## Features

* 🔐 Secure Google OAuth authentication
* 📅 Interactive monthly calendar showing daily productivity
* ⏰ Timetable view for creating and editing tasks
* 📊 Productivity dashboard with graphical statistics
* 🎯 Customisable productivity thresholds
* ⏱️ Track productive time and distraction time separately
* ☁️ User-specific data stored securely in a MySQL database

---

# Technology Stack

### Frontend

* React
* React Router
* JavaScript (ES6)
* CSS3
* Fetch API
* Vite

### Backend

* Node.js
* Express.js
* Passport.js
* Google OAuth 2.0
* Express Session

### Database

* MySQL
* mysql2

### Other Technologies

* Git
* GitHub
* Environment Variables (.env)
* REST API
* AWS Lightsail (deployment)
* AWS RDS (MySQL database)

---

# Main Features

## Authentication

* Google Sign-In
* Persistent login sessions
* Secure authentication using Passport.js

---

## Task Management

Users can:

* Create tasks
* Edit tasks
* Delete tasks
* Assign colours
* Add descriptions
* Record start and finish times

---

## Productivity Tracking

The application automatically calculates:

* Productive minutes
* Distraction minutes
* Total tracked time

Productive time is calculated as:

```
Task Duration − Distraction Time
```

---

## Monthly Calendar

The calendar provides a visual overview of an entire year's productivity.

Each day is colour coded based on the user's configurable productivity limits.

Example:

* 🔴 Low productivity
* 🟠 Moderate productivity
* 🟡 Good productivity
* 🟢 Excellent productivity
* 🟢 Dark Green Outstanding productivity

---

## Statistics

The dashboard displays:

* Productive time
* Distraction time
* Total tracked time
* Productivity percentage
* Last 30 days summary

---

## Settings

Users can customise their own productivity goals by choosing how many productive minutes correspond to each calendar colour.

For example:

| Colour     | Minutes |
| ---------- | ------- |
| Red        | 120     |
| Orange     | 240     |
| Yellow     | 360     |
| Green      | 480     |
| Dark Green | 600     |

---

# Project Structure

```
Frontend
│
├── React
├── Components
├── Pages
├── Layouts
└── CSS

Backend
│
├── Express
├── Routes
├── Middleware
├── Passport Authentication
├── Database
└── Helpers

Database
│
├── Users
├── Tasks
├── Time Sessions
└── User Task Limits
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/yourusername/task-time-tracker.git
```

Install dependencies

```bash
npm install
```

Frontend

```bash
npm run dev
```

Backend

```bash
node src/index.js
```

Create both frontend and backend `.env` files containing the required environment variables before running the application.

---

# Future Improvements

* Mobile responsive layout
* Weekly analytics
* Export productivity reports
* Email reminders
* Task categories
* Dark/Light theme
* Search and filtering
* Multiple calendar views

---


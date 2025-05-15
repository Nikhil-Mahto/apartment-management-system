# Apartment Management System

A full-stack web application to manage apartments, residents, complaints, and bookings using React and Spring Boot.

## Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Spring Boot, REST APIs, Spring Data JPA, Hibernate
- **Database**: MySQL + PL/SQL
- **Authentication**: JWT-based login
- **Build Tools**: Maven

## Roles

- **Admin**: Manage apartments, complaints, residents, announcements
- **Resident**: View apartments, pay rent, raise complaints
- **Visitor**: Request apartment bookings

## Features

- Login/Register with JWT
- Apartment Listing with availability
- Raise & track complaints
- Admin dashboard with reports
- Rent tracking and dummy payments
- Clean React UI with role-based views

## 🏗️ Folder Structure

```bash
├── backend/
│   ├── src/main/java/com/ams
│   │   ├── controller/       # API endpoints
│   │   ├── service/          # Business logic
│   │   ├── model/            # Entity classes
│   │   ├── repository/       # Data access
│   │   ├── config/           # Configuration
│   │   ├── util/             # Utility classes
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── schema.sql        # Database schema
│   │   ├── data.sql          # Sample data
│   │   ├── procedures.sql    # Stored procedures
│   ├── database/             # Database scripts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
```

## Database Setup

### Prerequisites

- MySQL 8.0 or higher

### Setup

1. Install MySQL if you haven't already
2. Create a database named `apartment_management`
3. Configure connection details in `backend/src/main/resources/application.properties`
4. The application will automatically create tables and populate sample data on first run

### Database Scripts

The project includes SQL scripts in the `backend/database` directory:

- `schema.sql` - Creates database tables
- `data.sql` - Populates sample data
- `procedures.sql` - Creates stored procedures

### Default Credentials

The sample data includes these users:

- Admin: admin@ams.com / password123
- Resident: john@example.com / password123
- Visitor: sarah@example.com / password123

## Running the Application

### Backend

```bash
cd backend
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080/api`

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

```bash
├── backend/
│   └── Spring Boot app
├── frontend/
│   └── React app
├── database/
│   └── schema.sql, procedures.sql

## Structure

backend/
├── controller/
│   └── ApartmentController.java
├── service/
│   └── ApartmentService.java
├── model/
│   └── Apartment.java, Complaint.java, User.java
├── repository/
│   └── ApartmentRepository.java
├── config/
│   └── SecurityConfig.java (JWT Setup)
├── util/
│   └── JwtUtil.java
├── ApartmentManagementApplication.java
└── pom.xml



frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js, LoginForm.js, ApartmentCard.js
│   ├── pages/
│   │   ├── AdminDashboard.js, ResidentDashboard.js
│   ├── services/
│   │   └── api.js (Axios calls)
│   └── App.js, routes.js
├── public/
└── package.json

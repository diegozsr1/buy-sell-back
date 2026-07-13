# Buy&Sell Backend

<p align="center">

RESTful API developed with Node.js, Express and MySQL for the Buy&Sell marketplace application.

</p>

<p align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)](https://swagger.io/)

</p>

---

# Overview

The Buy&Sell Backend provides a RESTful API responsible for handling authentication, authorization, product management, user interactions and business logic.

It follows a modular architecture based on controllers, routes and middlewares, allowing the application to scale while keeping responsibilities separated.

The API communicates with a MySQL database and secures protected endpoints using JSON Web Tokens (JWT).

---

# Related Repositories

## Main Project

https://github.com/diegozsr1/buy-sell

## Live Demo

https://buysell-backend-3knc.onrender.com/api-docs/

## Frontend

https://github.com/diegozsr1/buy-sell-front

---

# Main Features

- REST API
- JWT Authentication
- Role-Based Authorization
- CRUD Product Management
- Product Images
- User Profiles
- Reviews
- Reports
- Favourite Products
- Messaging Support
- Swagger Documentation
- Secure Middleware Pipeline

---

# Technology Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime |
| Express | REST API |
| MySQL | Database |
| JWT | Authentication |
| Swagger | API Documentation |
| Multer / Cloudinary | Image Upload |
| dotenv | Environment Configuration |

---

# Authentication

Authentication is implemented using JSON Web Tokens.

Workflow:

```text
User Login
        │
        ▼
Credentials Validation
        │
        ▼
JWT Generation
        │
        ▼
Token returned
        │
        ▼
Protected Requests
        │
        ▼
JWT Middleware Validation
        │
        ▼
Authorized Controller
```

---

# Authorization

Role-based authorization protects administrator and moderator routes.

Supported roles include:

- Administrator
- Moderator
- Standard User

Each protected endpoint validates the authenticated user's permissions before executing the request.

---

# API Modules

The API is divided into independent modules.

- Authentication
- Users
- Products
- Images
- Categories
- Reviews
- Reports
- Favourites
- Conversations
- Messages

This modular design simplifies maintenance and future development.

---

# Middlewares

Several middlewares are used throughout the application.

## JWT Middleware

Responsible for:

- Reading Authorization headers.
- Validating JWT tokens.
- Extracting authenticated user information.

---

## Role Middleware

Responsible for:

- Checking user roles.
- Restricting privileged routes.
- Preventing unauthorized access.

---

## Error Middleware

Centralises server-side error handling to ensure consistent API responses.

---

# Swagger Documentation

The API includes Swagger documentation, allowing developers to explore available endpoints interactively.

Example categories:

- Authentication
- Products
- Users
- Reports
- Reviews
- Images

Swagger makes testing and integration considerably easier during development.

---

# Database

The application stores information in MySQL.

Main entities include:

- Users
- Products
- Images
- Categories
- Reviews
- Reports
- Favourite Products
- Conversations
- Messages

Relationships are documented in the project's database documentation.

---

# Project Structure

```text
src/

controllers/

routes/

middlewares/

services/

config/

database/

utils/

swagger/

app.js

server.js
```

---

# Security

Several security mechanisms are implemented.

- Password hashing
- JWT Authentication
- Protected Routes
- Role Validation
- Environment Variables
- Secure Middleware Chain

---

# Installation

Clone repository

```bash
git clone https://github.com/diegozsr1/buy-sell-back
```

Install dependencies

```bash
npm install
```

Create environment file

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run development server

```bash
npm run dev
```

or

```bash
npm start
```

---

# API Documentation

Once the server is running, Swagger documentation is available through the configured Swagger endpoint.

---

# Future Improvements

- Docker support
- Refresh Tokens
- Rate Limiting
- Request Validation
- Unit Testing
- Integration Testing
- Logging System
- CI/CD Pipeline
- Monitoring

---

# Documentation

Complete documentation is available in the main repository.

📚 https://github.com/diegozsr1/buy-sell

---

# My Contributions

During the development of the backend I contributed to several core features, including:

- JWT authentication middleware.
- Role authorization middleware.
- Product images endpoint.
- Authentication integration between frontend and backend.
- Route protection.
- API integration for Angular services.

These contributions helped establish a secure communication flow between both applications while maintaining a modular and scalable architecture.

---

# License

This project was developed for educational purposes as part of the Full Stack Developer Master's Degree at UNIR.

---

# Author

Developed collaboratively by **Group 3**.

Backend contributions by **Diego Zapata** focused on authentication, authorization, protected routes and API integration.

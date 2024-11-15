# Car Management Application

This project is a Car Management Application that allows users to register, log in, and manage their cars by adding, viewing, editing, and deleting car details. Each car can contain up to 10 images, a title, description, and tags (car type, company, dealer, etc.). This app also includes user authentication and a search functionality for easy car lookup.

## Features

- **User Authentication**: Register and log in with secure authentication.
- **Car Management**: Create, read, update, and delete car entries.
- **Car Search**: Search for cars by title, description, or tags.
- **User-Specific Access**: Each user can only manage their own car entries.
- **Responsive UI**: User-friendly design with Tailwind CSS.
- **Deployed on Vercel**: Accessible from anywhere, no local setup required.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

---

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Vercel (Frontend and Serverless Functions)
- **Other**: CORS for cross-origin requests, JWT for authentication

## Deployment

### Deploying to Vercel

1. **Frontend Deployment**: https://spyne-ai-frontend.vercel.app/

2. **Backend Deployment**: https://spyne-ai-seven.vercel.app/

---

## API Documentation

The API documentation is available on the `https://spyne-ai-seven.vercel.app/api/docs` route.

### Example Endpoints

- **POST /api/users/signup**: Register a new user.
- **POST /api/users/login**: Log in a user.
- **POST /api/cars**: Create a new car entry.
- **GET /api/cars**: Retrieve all cars for the authenticated user.
- **GET /api/cars/:id**: Retrieve a specific car by ID.
- **PATCH /api/cars/:id**: Update a specific car.
- **DELETE /api/cars/:id**: Delete a specific car.

---

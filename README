# 📚 Library Management Application

A simple **Fullstack CRUD application** for managing books, built with **Angular** (frontend) and **Django** (backend).  
The project is fully containerized with **Docker**, so you can run it in a single command.

---

## 🚀 Features

### Frontend (Angular)
- Display the list of books (title, author, year)
- Add a new book via a **reactive form** with validation
- Edit or delete an existing book
- Communicate with the API using HTTP requests (GET, POST, PUT, DELETE)

### Backend (Django)
- REST API for book management
- Routes:
  - `GET api/books` → List all books
  - `POST api/books` → Add a new book
  - `PUT api/books/:id` → Update a book
  - `DELETE api/books/:id` → Delete a book
- Integrated API documentation via **Swagger** at:
[Backend Documentation Link](http://127.0.0.1:8000/swagger/)


### Database
- Uses Alchemy ORM
- Simple database schema with **Book** entity (title, author, year, pages, ISBN)
- SQLite database

---

## Tech Stack
- **Frontend:** Angular 19
- **Backend:** Django (Python 3)
- **Database:** SQLite (default)
- **Containerization:** Docker & Docker Compose
- **API Docs:** Swagger

---

## Installation & Usage

### 1️- Prerequisites
- [Docker](https://www.docker.com/) installed and running  
- [Docker Compose](https://docs.docker.com/compose/) installed

### 2️- Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```
### 3️- Start the Application
```bash
docker-compose up --build
```

### This will:

Build and start the frontend on http://localhost:4200

Build and start the backend API on http://localhost:8000

Serve API documentation at http://localhost:8000/swagger/

### Project Structure

```bash
📦 project-root
 ┣ 📂 library-frontend     # Angular frontend
 ┣ 📂 library_api          # Django backend
 ┣ 📜 docker-compose.yml   # Multi-container configuration
 ┣ 📜 README.md            # Project documentation
 ┗ 📜 .gitignore           # Ignored files (node_modules, venv, etc.)

```

### How It Works

Frontend sends HTTP requests to http://backend:8000 inside Docker network

Backend handles CRUD operations using Alchemy ORM

Swagger provides an interactive API documentation interface

### License

This project is for technical assessment purposes — no specific license applied.

# Developed By 
## Mohamed Amine Harbaoui
# NestJS Authentication + SQLite Demo App

This is a simple NestJS application that demonstrates how to implement **JWT-based authentication**, **user registration**, **form submission**, and **SQLite database integration** using **TypeORM**.

It's ideal for educational use, training, or as a demo for teaching how to build secure, modular Node.js applications with NestJS.

---

## 🧩 Features

- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Protected routes using `AuthGuard`
- ✅ Form submission to store user data
- ✅ SQLite database (file-based, no server required)
- ✅ Simple HTML frontend with Bootstrap UI
- ✅ RESTful API endpoints
- ✅ bcrypt password hashing

---

## 🧰 Tech Stack

| Technology | Purpose |
|----------|---------|
| NestJS | Node.js framework with TypeScript |
| TypeORM | ORM for SQLite |
| SQLite | Lightweight, file-based database |
| Passport.js | Authentication middleware |
| JWT | Token-based secure access |
| bcryptjs | Secure password hashing |
| HTML + Bootstrap | Frontend UI for login and form submission |

---

## 📁 Project Structure

```
nest-login-app/
├── public/
│   └── index.html         # Frontend login + form UI
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── local.strategy.ts
│   │   └── jwt.strategy.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── user.entity.ts
│   ├── profile/
│   │   ├── profile.controller.ts
│   │   ├── profile.service.ts
│   │   └── profile.entity.ts
│   ├── app.module.ts
│   └── main.ts
├── ormconfig.json          # SQLite DB config
├── package.json
└── README.md
```

---

## 📦 Installation

1. Clone the project or create a new NestJS app:

```bash
nest new nest-login-app
cd nest-login-app
```

2. Install dependencies:

```bash
npm install
npm install @nestjs/passport passport passport-local passport-jwt bcryptjs
npm install @nestjs/typeorm typeorm pg
npm install bcryptjs
npm install --save-dev @types/bcryptjs
npm install @nestjs/jwt jwt-simple
```

3. Create `ormconfig.json`:

```json
{
  "type": "sqlite",
  "database": "nest_db.sqlite",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

4. Generate modules:

```bash
nest generate module auth
nest generate controller auth
nest generate service auth

nest generate module users
nest generate controller users
nest generate service users

nest generate module profile
nest generate controller profile
nest generate service profile
```

5. Add the entities and logic as described in the documentation.

6. Add a `public/index.html` file for the frontend.

---

## 🧪 Running the App

```bash
npm run start
```

Then visit:

```
http://localhost:3000
```

You'll see a login form. After logging in, you can submit a profile form and see saved data.

---

## 🧑‍🏫 API Endpoints

### 🔐 Authentication

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive a JWT token

### 📋 Profile Data

- `POST /profile` – Submit profile (requires JWT token in header)
- `GET /profile` – Fetch all profiles (requires JWT token in header)

---

## 📝 Example API Requests

### Register a User

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"abgrx","password":"Abgr1234"}'
```

### Login and Get JWT Token

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"abgrx","password":"Abgr1234"}'
```

### Submit a Profile

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/profile" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx"} `
  -Body '{"fullName":"John Doe","email":"john@example.com"}'
```

### Fetch Saved Profiles

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/profile" `
  -Headers @{"Authorization"="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx"}
```

---

## 🧱 Key Concepts

| Concept | Description |
|--------|-------------|
| NestJS Modules | Used to organize features like auth, users, and profile |
| Controllers | Handle incoming HTTP requests |
| Services | Contain business logic and interact with the database |
| TypeORM | ORM for SQLite database interaction |
| JWT | Token-based authentication |
| Guards | Protect routes using `AuthGuard('jwt')`
| bcrypt | Secure password hashing and comparison
| HTML + Bootstrap | Frontend UI for login and form submission

---

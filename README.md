# CodeAlpha Task 1 - Simple E-commerce Store

A full-stack e-commerce application built for the CodeAlpha Full Stack Development Internship.

## Features
- User registration and login with JWT authentication
- Product listing and product details
- Category/search filtering
- Shopping cart
- Checkout and order processing
- User order history
- Admin product creation/update/delete APIs
- MongoDB database integration
- RESTful Express.js API
- Responsive React UI

## Tech Stack
Frontend: React + Vite + React Router
Backend: Node.js + Express.js
Database: MongoDB / MongoDB Atlas
Authentication: JWT + bcryptjs

## Project Structure
```
CodeAlpha_EcommerceStore/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
└── frontend/
    └── src/
        ├── components/
        ├── context/
        └── pages/
```

## Run locally
### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
For macOS/Linux use `cp .env.example .env`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (normally http://localhost:5173).

## Environment variables
`backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/orders` (authenticated)
- `GET /api/orders/my` (authenticated)
- `GET /api/orders/:id` (authenticated)

## CodeAlpha submission
Recommended repository name: `CodeAlpha_EcommerceStore`

Before submission, add screenshots/video and your deployed links if available.

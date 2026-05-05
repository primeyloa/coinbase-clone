# Coinbase Clone Backend

This is the backend API for the Coinbase Clone application, built with Node.js, Express, and MongoDB.

## Features

- JWT-based authentication (register, login, profile)
- Cryptocurrency data management (CRUD operations)
- Protected routes with middleware
- MongoDB for data storage

## Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
5. Start the server: `npm run dev` (for development) or `npm start` (for production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Cryptocurrency
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top gainers
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new cryptocurrency

## Deployment

The backend is ready for deployment. Make sure to set the environment variables appropriately for your deployment platform (e.g., Heroku, Vercel, etc.).

For MongoDB, you can use MongoDB Atlas for a cloud database.
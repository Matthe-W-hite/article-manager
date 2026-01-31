# My App

A full-stack web application with user authentication, article management, and admin panel.

## Features

- User registration and login
- JWT authentication with HttpOnly cookies
- Article creation, editing, and deletion
- Category management
- Admin panel for managing users and content
- Responsive UI with Material-UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (assumed, based on models)
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- React Router
- Axios for API calls
- Material-UI for components
- Tailwind CSS for styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create `.env` file in backend folder
   - Add `JWT_SECRET=your-secret-key`
   - Add database connection string

5. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

6. Start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Articles
- GET /api/articles
- POST /api/articles (protected)
- PUT /api/articles/:id (protected)
- DELETE /api/articles/:id (protected)

### Categories
- GET /api/categories
- POST /api/categories (admin)
- PUT /api/categories/:id (admin)
- DELETE /api/categories/:id (admin)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
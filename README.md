# Mern-Blog-Website
 
This is a full-stack application built with React and Express that demonstrates user authentication.

## Features

- User registration
- User login
- Protected routes

## Technologies Used

- React
- Express
- MongoDB
- JWT for authentication

## Setup Instructions

1. Clone the repository:
git clone https://github.com/shrey0511/Mern-Blog-Website-app.git


2. Install dependencies for the backend:
cd Mern-Blog-Website/api
npm install


3. Create a `.env` file in the backend directory with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


4. Start the backend server:
nodemon index.js


5. Install dependencies for the frontend:
cd ../client
npm install


6. Start the frontend development server:
yarn start


7. Open your browser and go to `http://localhost:3000`.

## Usage

- Register a new user.
- Login with the registered user credentials.
- Access protected routes after logging in.

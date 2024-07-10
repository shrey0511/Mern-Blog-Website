# MERN Blog Website

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

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- yarn (optional, but recommended for frontend dependency management)

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/shrey0511/Mern-Blog-Website-app.git
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd Mern-Blog-Website/api
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:

```bash
nodemon index.js
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../client
```

2. Install frontend dependencies:

```bash
yarn install
```

3. Start the frontend development server:

```bash
yarn start
```

4. Open your browser and go to `http://localhost:3000`.

## Usage

1. Register a new user.
2. Login with the registered user credentials.
3. Access protected routes after logging in.

## Requirements

Ensure you have the required dependencies by using the provided `requirements.txt` files for both backend and frontend.

### Backend Dependencies

```txt
express
mongoose
dotenv
jsonwebtoken
nodemon
```

### Frontend Dependencies

```txt
react
react-dom
react-router-dom
axios
```

To install all required dependencies for the backend and frontend, you can use the following commands:

```bash
cd Mern-Blog-Website/api
xargs -a requirements.txt -n 1 npm install

cd ../client
xargs -a requirements.txt -n 1 yarn add
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions, suggestions, or feedback, feel free to contact the repository maintainer:

- Name: Shreyansh Singh
- Email: singh.shrey0511@gmail.com
- GitHub: https://github.com/shrey0511

Thank you for visiting this repository! We hope you find it useful and informative. Happy coding!

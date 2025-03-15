# Y Image Sharing App

A full-stack image sharing application with temporary image expiration, built with Node.js, Express, TypeScript, and React.

## Repository Structure

This repository contains both the frontend and backend components of the Y Image Sharing App:

```
y-image-sharing-app/
├── backend/                # Backend Node.js application
├── frontend/               # Frontend React application 
└── .gitignore
```

## Features

- **Image Upload:** Users can upload images through an intuitive interface
- **Expiration Settings:** Set custom expiration times for uploaded images
- **Shareable URLs:** Easily share images via generated URLs
- **Automatic Cleanup:** System automatically removes expired images
- **Responsive UI:** Modern, mobile-friendly user interface

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) for running PostgreSQL

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/phoenix979/y-image-sharing-app.git
cd y-image-sharing-app
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   DATABASE_URL=postgres://user:yourpassword@localhost:5433/mydatabase
   PORT=3001
   UPLOAD_DIR=uploads
   ```

4. Start PostgreSQL with Docker:
   ```bash
   docker run --name mypostgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=mydatabase -p 5433:5432 -d postgres:15
   ```

5. Build and start the backend server:
   ```bash
   yarn build && yarn start
   # or
   npm run build && npm start
   ```

   For development with hot-reloading:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the frontend development server:
   ```bash
   yarn start
   # or
   npm start
   ```

The frontend will be available at http://localhost:3000, and it will connect to the backend API at http://localhost:3001.

## API Endpoints

### POST /v1/images
- **Description:** Upload an image
- **Form Data:**
  - `image`: The image file (multipart form-data)
  - `expiration`: Expiration time in seconds
- **Response:** JSON with the shareable image URL

### GET /v1/images/:imageID
- **Description:** Retrieve an image by its ID
- **Response:** Returns the image file or 404 if not found/expired

## Running Tests

### Backend Tests
```bash
cd backend
yarn test
# or
npm test
```

### Frontend Tests
```bash
cd frontend
yarn test
# or
npm test
```


## Acknowledgments

- Node.js and Express for the backend framework
- React for the frontend framework
- TypeORM for database interactions
- PostgreSQL for database storage
# Y Image Sharing App - Backend

This is the backend for the **Y Image Sharing App**, an image-sharing service that allows users to upload images with temporary expiration times. The backend is built with Node.js, Express, and TypeScript, uses TypeORM for database interactions, and is designed for production deployment.

## Features

- **Image Upload:** Users can upload images.
- **Expiration Setting:** Each image has an expiration time after which it is automatically removed.
- **Image Retrieval:** Retrieve images via shareable URLs (only if they have not expired).
- **Automatic Cleanup:** A scheduled task cleans up expired images from both the filesystem and the database.
- **TypeScript & Production Quality:** Written in TypeScript with production-level design and error handling.
- **Unit Testing:** Includes unit tests for the automatic image cleanup logic using Jest.

## Folder Structure

```
y-image-sharing-app/
├── .env
├── package.json
├── tsconfig.json
├── jest.config.js
├── README.md
├── uploads/                # Directory for uploaded images
└── src/
    ├── app.ts
    ├── server.ts
    ├── data-source.ts
    ├── controllers/
    │   └── imageController.ts
    ├── entity/
    │   └── Image.ts
    ├── middleware/
    │   └── errorHandler.ts
    ├── repositories/
    │   └── imageRepository.ts
    ├── routes/
    │   └── imageRoutes.ts
    ├── services/
    │   └── imageService.ts
    ├── tests/
    │   └── imageService.test.ts
    └── utils/
        └── fileStorage.ts
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) for running the PostgreSQL container

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/y-image-sharing-app.git
   cd y-image-sharing-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Create a .env file in the project root with the following content:**

   ```ini
   DATABASE_URL=postgres://user:yourpassword@localhost:5433/mydatabase
   PORT=3001
   UPLOAD_DIR=uploads
   ```

## Running PostgreSQL with Docker

Make sure you have Docker Desktop installed. Use the following command to run a PostgreSQL container:

```bash
docker run --name mypostgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=mydatabase -p 5433:5432 -d postgres:15
```

- **Container Name:** mypostgres
- **Image:** postgres:15
- **Port Mapping:** Host port 5433 is mapped to container port 5432.
- **Environment Variables:**
  - POSTGRES_USER=user
  - POSTGRES_PASSWORD=yourpassword
  - POSTGRES_DB=mydatabase

This container will serve as your PostgreSQL database. Verify it's running by executing:

```bash
docker exec -it mypostgres psql -U user -d mydatabase
```

## Building and Running the Server

1. **Build the project:**

   ```bash
   yarn build
   ```

2. **Start the server:**

   ```bash
   yarn start
   ```

The server will start on the port specified in your .env file (e.g., 3001). You should see output like:

```
DATABASE_URL: postgres://user:yourpassword@localhost:5433/mydatabase
Server is running on port 3001
```

## Development Mode

For hot-reloading during development, run:

```bash
yarn dev
```

## Running Tests

The project uses Jest for unit testing. To run the tests:

```bash
yarn test
```

This will execute your tests (e.g., for the image cleanup logic) defined in src/tests.

## API Endpoints

### POST /v1/images
- **Description:** Upload an image.
- **Form Data:**
  - `image`: The image file (multipart form-data).
  - `expiration`: Expiration time in seconds.
- **Response:** JSON with the shareable image URL.

### GET /v1/images/:imageID
- **Description:** Retrieve an image by its ID if it exists and has not expired.
- **Response:** Returns the image file or an error if not found/expired.

## Additional Notes

- **Production Considerations:** For production, consider using persistent file storage (e.g., cloud storage) and proper database migrations.
- **Environment Variables:** Adjust the .env file as needed.
- **Code Quality:** The project is structured for clarity, modularity, and maintainability.

## License

This project is licensed under the MIT License.
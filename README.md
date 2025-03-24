# PRW3 Server

## Description

This is the backend server component of the PRW3 project, built with Express.js and MongoDB. It provides REST API endpoints for user management, group handling, and points of interest functionality.

## Getting Started

### Prerequisites

#### Source Control

- Git version 2.39+

#### Development

- Node.js 23+
- TypeScript 5.7+
- Docker Desktop
- Your favorite code editor (e.g., Visual Studio Code)

### Installation

1. Clone the repository

```bash
git clone https://github.com/retrouve-ta-tribu/server.git
cd PRW3-server
```

2. Install dependencies

```bash
npm install
```

### Configuration

1. Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

2. Configure the variables in `.env`

### Database Setup

Start the MongoDB database using Docker:

```bash
docker compose up -d
```

### Run the server locally

For development with hot-reload:

```bash
npm run dev
```

## API Documentation

The API is documented using Postman. You can find the complete collection in [PRW3.postman_collection.json](./PRW3.postman_collection.json).

## Directory Structure

```shell
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   ├── models/
│   └── routes/
├── docker-compose.yml
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

# Academic Management Platform

A scalable academic management platform built with microservices, REST APIs, API Gateway, Docker, CI/CD and basic observability.

## Architecture

The project follows a microservices architecture using an API Gateway as the single entry point between the frontend and backend services.

Main flow:

```text
Frontend → API Gateway → Microservices → Databases
```

For more details, see: [Architecture Documentation](docs/architecture.md).

## Microservices Responsibilities

The project is divided into three independent microservices:

- `auth-service`: responsible for users, students, professors and authentication.
- `academic-service`: responsible for disciplines, classes and enrollments.
- `activity-service`: responsible for activities, submissions and grades.

Each service owns its own entities, database and business rules.

For more details, see: [Microservices Responsibilities](docs/microservices.md)

## Main Technologies

- Node.js
- TypeScript
- REST API
- Docker
- Docker Compose
- PostgreSQL
- GitHub Actions
- API Gateway

## Running the project

```bash
cd infra
docker compose up
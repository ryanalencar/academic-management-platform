# Academic Management Platform

A scalable academic management platform built with microservices, REST APIs, API Gateway, Docker, CI/CD and basic observability.

## Architecture

The project follows a microservices architecture using an API Gateway as the single entry point between the frontend and backend services.

Main flow:

```text
Frontend → API Gateway → Microservices → Databases
```

Know more about the architecture in the [Architecture Documentation](docs/architecture.md).

## Services

- auth-service: users, students, professors and authentication.
- academic-service: disciplines, classes and enrollments.
- activity-service: activities, submissions and grades.

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
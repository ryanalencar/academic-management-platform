# Academic Management Platform

A scalable academic management platform built with microservices, REST APIs, API Gateway, Docker, CI/CD and basic observability.

## Architecture

The platform follows a microservices architecture:

Frontend → API Gateway → Microservices

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
# Platform Architecture

## Academic Management Platform

The Academic Management Platform is designed using a microservices architecture to support scalability, maintainability and independent service evolution.

The system is divided into independent services responsible for specific business domains. The frontend communicates only with the API Gateway, and the API Gateway forwards requests to the correct microservice.

---

## Architecture Flow

```text
Frontend → API Gateway → Microservices → Databases
```

### Flow Description

1. The frontend sends HTTP requests to the API Gateway.
2. The API Gateway receives the request and identifies the correct destination service.
3. The API Gateway forwards the request to the responsible microservice.
4. The microservice processes the business logic.
5. The microservice reads or writes data in its own database.
6. The response is returned to the API Gateway.
7. The API Gateway returns the final response to the frontend.

This approach avoids direct communication between the frontend and the internal microservices.

---

## High-Level Architecture

```text
academic-management-platform/
│
├── Frontend
│   └── Consumes the API Gateway
│
├── API Gateway
│   ├── Routes authentication requests to auth-service
│   ├── Routes academic requests to academic-service
│   └── Routes activity requests to activity-service
│
└── Microservices
    ├── auth-service
    │   └── Handles users, students, professors and authentication
    │
    ├── academic-service
    │   └── Handles disciplines, classes and enrollments
    │
    └── activity-service
        └── Handles activities, submissions and grades
```

---

## Microservices

### Auth Service

The `auth-service` is responsible for user management and authentication.

It owns the following entities:

* Usuario
* Aluno
* Professor

Main responsibilities:

* Register users.
* Register students.
* Register professors.
* Authenticate users.
* Generate JWT tokens.
* Hash passwords before storing them.
* Validate authenticated requests.
* Manage basic user roles, such as `ALUNO`, `PROFESSOR` and `ADMIN`.

Example routes:

```text
POST /auth/login
POST /auth/students
POST /auth/professors
GET /auth/me
GET /auth/health
```

---

### Academic Service

The `academic-service` is responsible for the academic structure of the platform.

It owns the following entities:

* Disciplina
* Turma
* Matricula

Main responsibilities:

* Manage disciplines.
* Manage classes.
* Associate professors with disciplines.
* Associate disciplines with classes.
* Enroll students in classes.
* List student enrollments.
* List class enrollments.
* Update enrollment status.

Example routes:

```text
POST /disciplines
GET /disciplines
GET /disciplines/:id
PUT /disciplines/:id
DELETE /disciplines/:id

POST /classes
GET /classes
GET /classes/:id
PUT /classes/:id
DELETE /classes/:id

POST /enrollments
GET /enrollments/student/:studentId
GET /enrollments/class/:classId
PATCH /enrollments/:id/status

GET /academic/health
```

---

### Activity Service

The `activity-service` is responsible for activities, submissions and grades.

It owns the following entities:

* Atividade
* Entrega

Main responsibilities:

* Create activities for classes.
* List activities by class.
* Manage activity deadlines.
* Allow students to submit activities.
* Register submission dates.
* Register grades.
* List submissions by student.
* List submissions by activity.

Example routes:

```text
POST /activities
GET /activities
GET /activities/:id
GET /activities/class/:classId
PUT /activities/:id
DELETE /activities/:id

POST /submissions
GET /submissions/student/:studentId
GET /submissions/activity/:activityId
PATCH /submissions/:id/grade

GET /activities/health
```

---

## API Gateway Responsibility

The API Gateway is the single entry point between the frontend and the backend services.

Main responsibilities:

* Receive all frontend HTTP requests.
* Route requests to the correct microservice.
* Hide internal microservice URLs from the frontend.
* Forward authorization headers.
* Centralize route mapping.
* Handle basic communication errors between services.
* Expose a single public API for the frontend.
* Provide a health check endpoint.

The frontend should not call microservices directly. Instead, every request should pass through the Gateway.

Example routing strategy:

```text
/api/auth/*        → auth-service
/api/academic/*    → academic-service
/api/activities/*  → activity-service
```

Example gateway routes:

```text
POST /api/auth/login
POST /api/auth/students
POST /api/auth/professors

GET /api/academic/disciplines
POST /api/academic/classes
POST /api/academic/enrollments

GET /api/activities/class/:classId
POST /api/activities/submissions
PATCH /api/activities/submissions/:id/grade
```

---

## Docker and Docker Compose

Docker is used to containerize each backend service independently.

Each service must have its own `Dockerfile`:

```text
services/auth-service/Dockerfile
services/academic-service/Dockerfile
services/activity-service/Dockerfile
gateway/Dockerfile
```

Docker Compose is used to run the entire platform locally with a single command.

The main Docker Compose file is located at:

```text
infra/docker-compose.yml
```

Expected containers:

* API Gateway container
* Auth Service container
* Academic Service container
* Activity Service container
* Auth database container
* Academic database container
* Activity database container
* Optional monitoring containers

The platform should run locally using:

```bash
cd infra
docker compose up
```

Benefits of Docker Compose in this project:

* Reproducible development environment.
* Isolated services.
* Easy local execution.
* Environment variable configuration.
* Internal network communication between services.
* Simplified project evaluation.

---

## Database Strategy

Each microservice should own its own database.

This follows an important microservices principle: each service is responsible for its own data and should not directly access another service database.

Suggested database separation:

```text
auth-service      → auth_db
academic-service  → academic_db
activity-service  → activity_db
```

### Auth Database

Stores:

* Users
* Students
* Professors
* Authentication-related data

### Academic Database

Stores:

* Disciplines
* Classes
* Enrollments

### Activity Database

Stores:

* Activities
* Submissions
* Grades

### Cross-Service Data References

Some services may need to reference data owned by another service. For example:

* `academic-service` may store `studentId` from `auth-service`.
* `academic-service` may store `professorId` from `auth-service`.
* `activity-service` may store `classId` from `academic-service`.
* `activity-service` may store `studentId` from `auth-service`.

These references should be stored as identifiers only. Services should not directly access another service database.

For this academic project, REST communication through the API Gateway or direct internal REST calls between services can be used when validation is required.

Example:

```text
academic-service stores professorId
academic-service does not access auth_db directly
```

---

## Basic Observability Strategy

The platform will include basic observability to help understand service health and runtime behavior.

The initial observability strategy includes:

* Health check endpoints.
* Basic request logs.
* Basic error logs.
* Docker Compose health checks.
* Monitoring folder prepared for future tools.

### Health Check Endpoints

Each service should expose a health check route:

```text
GET /health
```

Expected response example:

```json
{
  "status": "ok",
  "service": "auth-service"
}
```

The API Gateway should also expose a health check route:

```text
GET /api/health
```

### Logging Strategy

Each service should log basic request information:

```text
timestamp
HTTP method
route
status code
response time
```

Sensitive information must not be logged.

The following data should never appear in logs:

* Passwords
* JWT tokens
* Authorization headers
* Personal sensitive data

### Monitoring Folder

The repository contains a monitoring folder:

```text
infra/monitoring/
```

This folder can be used to store future observability configurations, such as:

* Prometheus configuration
* Grafana dashboards
* Log aggregation configuration

For the initial version, the project only requires basic observability through logs and health checks.

---

## Expected Project Structure

```text
academic-management-platform/
├── services/
│   ├── auth-service/
│   ├── academic-service/
│   └── activity-service/
├── gateway/
├── infra/
│   ├── docker-compose.yml
│   └── monitoring/
├── docs/
│   └── architecture.md
├── .github/
│   └── workflows/
├── .env.example
├── .gitignore
└── README.md
```

---

## Architectural Decisions

### Use microservices

The platform is divided into independent services to improve scalability, maintainability and separation of responsibilities.

### Use API Gateway

The API Gateway centralizes frontend communication and hides internal service details.

### Use one database per service

Each service owns its own data, reducing coupling between services.

### Use Docker

Docker guarantees that each service can run in a consistent environment.

### Use Docker Compose

Docker Compose allows the full platform to run locally with one command.

### Use REST APIs

REST APIs provide a simple and understandable communication model for the academic project.

### Use basic observability

Health checks and logs provide enough visibility for development, debugging and academic evaluation.

---

## Summary

The architecture follows this main flow:

```text
Frontend → API Gateway → Microservices → Independent Databases
```

This structure supports the technical requirements of the project:

* Independent microservices.
* REST API communication.
* API Gateway.
* Database usage.
* Simple authentication.
* Docker and Docker Compose.
* Environment variables.
* Basic observability.
* DevOps practices with GitHub, Pull Requests, Issues and Milestones.

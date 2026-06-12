# Project Milestones

## Project: Academic Management Platform

This document describes the main milestones for the development of the Academic Management Platform. The project will be developed using a microservices architecture, API Gateway, Docker, REST APIs, database integration, simple authentication, CI/CD automation, GitHub workflow practices and basic observability.

---

## Milestone 1 — Repository and Project Planning

### Goal

Create the GitHub repository, define the initial project structure, organize the development workflow and document the main architectural decisions.

### Scope

* Create the GitHub repository.
* Define the base folder structure.
* Create the `main` and `develop` branches.
* Configure Git Flow usage.
* Create the initial README.
* Document the selected microservices.
* Create GitHub milestones.
* Create initial project issues.
* Define pull request and code review rules.

### Expected Deliverables

* GitHub repository created.
* Initial folder structure committed.
* `README.md` created.
* `docs/milestones.md` created.
* Git Flow strategy documented.
* First issues created in GitHub.
* Milestones registered in GitHub.

### Suggested Issues

* Create initial repository structure.
* Document project architecture.
* Define microservices responsibilities.
* Create GitHub milestones.
* Configure branch strategy.
* Create pull request template.

---

## Milestone 2 — Infrastructure and Docker Setup

### Goal

Create a reproducible development environment using Docker and Docker Compose.

### Scope

* Create a Dockerfile for each service.
* Create a Dockerfile for the API Gateway.
* Configure `docker-compose.yml`.
* Configure environment variables.
* Add `.env.example`.
* Configure service isolation.
* Add database containers.
* Ensure the project runs with `docker compose up`.

### Expected Deliverables

* Dockerfile for `auth-service`.
* Dockerfile for `academic-service`.
* Dockerfile for `activity-service`.
* Dockerfile for `gateway`.
* Docker Compose configuration.
* Environment variable documentation.
* Local environment running through Docker Compose.

### Suggested Issues

* Create Dockerfile for auth-service.
* Create Dockerfile for academic-service.
* Create Dockerfile for activity-service.
* Create Dockerfile for gateway.
* Configure docker-compose.
* Add database container.
* Create `.env.example`.
* Document how to run the project locally.

---

## Milestone 3 — Auth Service

### Goal

Develop the authentication and user management microservice.

### Scope

* Create the `Usuario` entity.
* Create the `Aluno` entity.
* Create the `Professor` entity.
* Implement user registration.
* Implement student registration.
* Implement professor registration.
* Implement login.
* Hash user passwords.
* Generate JWT tokens.
* Validate authenticated requests.

### Expected Deliverables

* Auth service running independently.
* User registration endpoint.
* Login endpoint.
* JWT authentication.
* Student and professor data model.
* Database integration.
* Basic validation.

### Suggested Issues

* Set up auth-service project.
* Create user database model.
* Create student database model.
* Create professor database model.
* Implement password hashing.
* Implement login endpoint.
* Implement JWT generation.
* Implement authentication middleware.
* Add auth-service documentation.

---

## Milestone 4 — Academic Service

### Goal

Develop the academic structure microservice responsible for disciplines, classes and enrollments.

### Scope

* Create the `Disciplina` entity.
* Create the `Turma` entity.
* Create the `Matricula` entity.
* Implement discipline management.
* Implement class management.
* Associate professors with disciplines.
* Associate disciplines with classes.
* Enroll students in classes.
* List enrollments by student.
* List enrollments by class.

### Expected Deliverables

* Academic service running independently.
* Discipline CRUD.
* Class CRUD.
* Enrollment creation.
* Enrollment listing.
* Database integration.
* REST API documentation.

### Suggested Issues

* Set up academic-service project.
* Create discipline model.
* Create class model.
* Create enrollment model.
* Implement discipline endpoints.
* Implement class endpoints.
* Implement enrollment endpoints.
* Add academic-service documentation.

---

## Milestone 5 — Activity Service

### Goal

Develop the activity and submission microservice.

### Scope

* Create the `Atividade` entity.
* Create the `Entrega` entity.
* Create activities for classes.
* List activities by class.
* Allow students to submit activities.
* Register grades for submissions.
* List submissions by student.
* List submissions by activity.

### Expected Deliverables

* Activity service running independently.
* Activity creation endpoint.
* Submission creation endpoint.
* Grade registration endpoint.
* Database integration.
* REST API documentation.

### Suggested Issues

* Set up activity-service project.
* Create activity model.
* Create submission model.
* Implement activity endpoints.
* Implement submission endpoints.
* Implement grade update endpoint.
* Add activity-service documentation.

---

## Milestone 6 — API Gateway and Service Integration

### Goal

Create the API Gateway and integrate all microservices through a single entry point.

### Scope

* Create the API Gateway.
* Configure routes to each microservice.
* Forward authentication headers.
* Add basic request validation.
* Configure REST communication between gateway and services.
* Document exposed routes.

### Expected Deliverables

* API Gateway running.
* Frontend-ready API routes.
* Integration with auth-service.
* Integration with academic-service.
* Integration with activity-service.
* Gateway route documentation.

### Suggested Issues

* Set up gateway project.
* Configure auth-service routes.
* Configure academic-service routes.
* Configure activity-service routes.
* Forward authorization header.
* Add gateway health check endpoint.
* Document gateway routes.

---

## Milestone 7 — CI/CD and GitHub Workflow

### Goal

Automate integration checks and enforce DevOps collaboration practices.

### Scope

* Configure GitHub Actions.
* Run build checks on pull requests.
* Run lint checks on pull requests.
* Run tests on pull requests.
* Require pull request review.
* Use issues to track tasks.
* Use milestones to track progress.
* Use Git Flow branches.

### Expected Deliverables

* GitHub Actions workflow configured.
* Pull request validation.
* Branch protection recommendation.
* PR review workflow documented.
* Issues and milestones actively used.

### Suggested Issues

* Create GitHub Actions workflow.
* Add lint check.
* Add build check.
* Add test check.
* Create pull request template.
* Document code review process.
* Document Git Flow process.

---

## Milestone 8 — Observability and Final Documentation

### Goal

Add basic observability and complete the final project documentation.

### Scope

* Add health check endpoints.
* Add basic logs.
* Add monitoring folder.
* Optionally configure Prometheus and Grafana.
* Document how to run the platform.
* Document architecture decisions.
* Document API routes.
* Document DevOps practices.
* Prepare final delivery README.

### Expected Deliverables

* Health check endpoints.
* Basic logging.
* Monitoring structure.
* Final README.
* Architecture documentation.
* API documentation.
* DevOps documentation.
* Final project delivery.

### Suggested Issues

* Add health check to auth-service.
* Add health check to academic-service.
* Add health check to activity-service.
* Add health check to gateway.
* Add basic request logs.
* Configure monitoring folder.
* Document observability strategy.
* Complete final README.

# GitHub Issues Backlog — Academic Management Platform

## Milestone 1 — Repository and Project Planning

---

### Issue 1.1 — Create initial repository structure

**Description**

Create the initial repository structure for the Academic Management Platform following the expected microservices architecture.

**Tasks**

* Create the base project structure.
* Create the `services/` folder.
* Create `auth-service`, `academic-service` and `activity-service`.
* Create the `gateway/` folder.
* Create the `infra/` folder.
* Create the `infra/monitoring/` folder.
* Create the `.github/workflows/` folder.
* Create the `docs/` folder.
* Add initial `README.md`.
* Add `.gitignore`.
* Add `.env.example`.

**Acceptance Criteria**

* The repository contains the expected folder structure.
* The project structure follows the required academic project architecture.
* The initial structure is committed to the repository.
* The issue is linked to Milestone 1.

**Suggested labels**

`chore`, `setup`, `documentation`

**Suggested branch**

```bash
chore/initial-project-structure
```

---

### Issue 1.2 — Document project architecture

**Description**

Document the initial architecture of the platform, including the relationship between frontend, API Gateway and microservices.

**Tasks**

* Document the architecture flow: Frontend → API Gateway → Microservices.
* Explain the role of each microservice.
* Explain the API Gateway responsibility.
* Explain the use of Docker and Docker Compose.
* Explain the database strategy.
* Explain the basic observability strategy.
* Add the architecture documentation to `README.md` or `docs/architecture.md`.

**Acceptance Criteria**

* The architecture is clearly documented.
* The documentation explains the purpose of each service.
* The documentation includes the expected project structure.
* The documentation is easy to understand for evaluators and developers.

**Suggested labels**

`documentation`, `architecture`

**Suggested branch**

```bash
docs/project-architecture
```

---

### Issue 1.3 — Define microservices responsibilities

**Description**

Define and document the responsibilities of each microservice in the platform.

**Tasks**

* Document `auth-service`.
* Document `academic-service`.
* Document `activity-service`.
* Define which entities belong to each service.
* Define the main endpoints expected for each service.
* Document service boundaries.

**Acceptance Criteria**

* Each microservice has a clear responsibility.
* Entity ownership is documented.
* There is no unnecessary responsibility overlap between services.
* The documentation supports future implementation.

**Suggested labels**

`documentation`, `architecture`, `microservices`

**Suggested branch**

```bash
docs/microservices-responsibilities
```

---

### Issue 1.4 — Create pull request template

**Description**

Create a pull request template to standardize code review and ensure all project requirements are checked before merging.

**Tasks**

* Create `.github/pull_request_template.md`.
* Add summary section.
* Add checklist for tests.
* Add checklist for documentation.
* Add checklist for Docker validation.
* Add checklist for code review.
* Add section for linked issue.

**Acceptance Criteria**

* Pull request template exists.
* Template encourages good review practices.
* Template includes issue reference.
* Template includes validation checklist.

**Suggested labels**

`documentation`, `github`, `devops`

**Suggested branch**

```bash
docs/pull-request-template
```

---

### Issue 1.5 — Configure Git Flow documentation

**Description**

Document the Git Flow strategy used by the project.

**Tasks**

* Document the purpose of `main`.
* Document the purpose of `develop`.
* Document `feature/*` branches.
* Document `fix/*` branches.
* Document `docs/*` branches.
* Document `chore/*` branches.
* Explain that pull requests should target `develop`.
* Explain that code review is required before merge.

**Acceptance Criteria**

* Git Flow is documented.
* Branch naming rules are clear.
* Pull request rules are clear.
* The team can follow the workflow consistently.

**Suggested labels**

`documentation`, `github`, `devops`

**Suggested branch**

```bash
docs/git-flow
```

---

## Milestone 2 — Infrastructure and Docker Setup

---

### Issue 2.1 — Create Dockerfile for auth-service

**Description**

Create a Dockerfile for the authentication service.

**Tasks**

* Add Dockerfile inside `services/auth-service`.
* Configure Node.js runtime.
* Install dependencies.
* Build the TypeScript project.
* Expose the service port.
* Configure command to run the service.
* Use environment variables.

**Acceptance Criteria**

* `auth-service` has its own Dockerfile.
* The service can be built using Docker.
* The service can run inside a container.
* The container uses environment variables correctly.

**Suggested labels**

`docker`, `backend`, `auth-service`

**Suggested branch**

```bash
feature/auth-service-dockerfile
```

---

### Issue 2.2 — Create Dockerfile for academic-service

**Description**

Create a Dockerfile for the academic service.

**Tasks**

* Add Dockerfile inside `services/academic-service`.
* Configure Node.js runtime.
* Install dependencies.
* Build the TypeScript project.
* Expose the service port.
* Configure command to run the service.
* Use environment variables.

**Acceptance Criteria**

* `academic-service` has its own Dockerfile.
* The service can be built using Docker.
* The service can run inside a container.
* The container uses environment variables correctly.

**Suggested labels**

`docker`, `backend`, `academic-service`

**Suggested branch**

```bash
feature/academic-service-dockerfile
```

---

### Issue 2.3 — Create Dockerfile for activity-service

**Description**

Create a Dockerfile for the activity service.

**Tasks**

* Add Dockerfile inside `services/activity-service`.
* Configure Node.js runtime.
* Install dependencies.
* Build the TypeScript project.
* Expose the service port.
* Configure command to run the service.
* Use environment variables.

**Acceptance Criteria**

* `activity-service` has its own Dockerfile.
* The service can be built using Docker.
* The service can run inside a container.
* The container uses environment variables correctly.

**Suggested labels**

`docker`, `backend`, `activity-service`

**Suggested branch**

```bash
feature/activity-service-dockerfile
```

---

### Issue 2.4 — Create Dockerfile for API Gateway

**Description**

Create a Dockerfile for the API Gateway.

**Tasks**

* Add Dockerfile inside `gateway`.
* Configure Node.js runtime.
* Install dependencies.
* Build the TypeScript project.
* Expose the gateway port.
* Configure command to run the gateway.
* Use environment variables.

**Acceptance Criteria**

* API Gateway has its own Dockerfile.
* Gateway can be built using Docker.
* Gateway can run inside a container.
* Gateway can communicate with internal services.

**Suggested labels**

`docker`, `gateway`, `backend`

**Suggested branch**

```bash
feature/gateway-dockerfile
```

---

### Issue 2.5 — Configure Docker Compose

**Description**

Create the main Docker Compose configuration to run all services locally.

**Tasks**

* Create `infra/docker-compose.yml`.
* Add `auth-service`.
* Add `academic-service`.
* Add `activity-service`.
* Add `gateway`.
* Add database containers.
* Configure internal Docker network.
* Configure environment variables.
* Configure service dependencies.
* Ensure the platform runs with `docker compose up`.

**Acceptance Criteria**

* All services are defined in Docker Compose.
* Each service runs in an isolated container.
* Services communicate through Docker network.
* Databases run through Docker Compose.
* The full platform starts with one command.

**Suggested labels**

`docker`, `infra`, `devops`

**Suggested branch**

```bash
feature/docker-compose-setup
```

---

### Issue 2.6 — Create environment variables documentation

**Description**

Create and document the environment variables used by the project.

**Tasks**

* Create `.env.example`.
* Add variables for each service.
* Add variables for databases.
* Add variables for JWT authentication.
* Add variables for API Gateway routes.
* Document how to create a local `.env` file.

**Acceptance Criteria**

* `.env.example` exists.
* Required variables are documented.
* No sensitive value is committed.
* Developers can configure the local environment using the example file.

**Suggested labels**

`documentation`, `env`, `devops`

**Suggested branch**

```bash
docs/environment-variables
```

---

## Milestone 3 — Auth Service

---

### Issue 3.1 — Set up auth-service project

**Description**

Create the initial TypeScript backend project for the authentication service.

**Tasks**

* Initialize the backend project.
* Configure TypeScript.
* Configure project scripts.
* Configure basic folder structure.
* Add health check endpoint.
* Add basic error handling.
* Add basic request logging.

**Acceptance Criteria**

* `auth-service` runs locally.
* TypeScript is configured.
* Health check endpoint returns success.
* Project has a clean folder structure.

**Suggested labels**

`backend`, `auth-service`, `setup`

**Suggested branch**

```bash
feature/auth-service-setup
```

---

### Issue 3.2 — Create user, student and professor models

**Description**

Create the data models for users, students and professors.

**Tasks**

* Create `Usuario` model.
* Create `Aluno` model.
* Create `Professor` model.
* Represent inheritance relationship.
* Add fields for `id`, `nome`, `email`, `senha`, `tipo`.
* Add fields for `matricula` and `curso`.
* Add fields for `siape` and `departamento`.
* Configure database integration.

**Acceptance Criteria**

* User model is implemented.
* Student model is implemented.
* Professor model is implemented.
* Relationships are correctly represented.
* Models can be persisted in the database.

**Suggested labels**

`backend`, `database`, `auth-service`

**Suggested branch**

```bash
feature/auth-user-models
```

---

### Issue 3.3 — Implement user registration

**Description**

Implement endpoints to register users, students and professors.

**Tasks**

* Create student registration endpoint.
* Create professor registration endpoint.
* Validate required fields.
* Validate duplicated email.
* Hash passwords before saving.
* Return safe response without password.
* Add basic error handling.

**Acceptance Criteria**

* Student can be registered.
* Professor can be registered.
* Password is never returned in the response.
* Password is saved hashed.
* Duplicate email is rejected.
* Invalid payload returns validation error.

**Suggested labels**

`backend`, `auth-service`, `api`

**Suggested branch**

```bash
feature/auth-registration
```

---

### Issue 3.4 — Implement login and JWT authentication

**Description**

Implement login with JWT token generation.

**Tasks**

* Create login endpoint.
* Validate email and password.
* Compare password hash.
* Generate JWT token.
* Return token and basic user data.
* Create authentication middleware.
* Protect private routes.

**Acceptance Criteria**

* User can log in with valid credentials.
* Invalid credentials are rejected.
* JWT token is generated.
* Protected routes require authentication.
* Authentication middleware validates the token.

**Suggested labels**

`backend`, `auth-service`, `security`

**Suggested branch**

```bash
feature/auth-login-jwt
```

---

## Milestone 4 — Academic Service

---

### Issue 4.1 — Set up academic-service project

**Description**

Create the initial TypeScript backend project for the academic service.

**Tasks**

* Initialize the backend project.
* Configure TypeScript.
* Configure project scripts.
* Configure basic folder structure.
* Add health check endpoint.
* Add basic error handling.
* Add basic request logging.

**Acceptance Criteria**

* `academic-service` runs locally.
* TypeScript is configured.
* Health check endpoint returns success.
* Project has a clean folder structure.

**Suggested labels**

`backend`, `academic-service`, `setup`

**Suggested branch**

```bash
feature/academic-service-setup
```

---

### Issue 4.2 — Create discipline, class and enrollment models

**Description**

Create the academic data models.

**Tasks**

* Create `Disciplina` model.
* Create `Turma` model.
* Create `Matricula` model.
* Add relationship between professor and discipline.
* Add relationship between discipline and class.
* Add relationship between student and enrollment.
* Add relationship between class and enrollment.
* Configure database integration.

**Acceptance Criteria**

* Discipline model is implemented.
* Class model is implemented.
* Enrollment model is implemented.
* Relationships are correctly represented.
* Models can be persisted in the database.

**Suggested labels**

`backend`, `database`, `academic-service`

**Suggested branch**

```bash
feature/academic-models
```

---

### Issue 4.3 — Implement discipline endpoints

**Description**

Create REST endpoints to manage disciplines.

**Tasks**

* Create discipline endpoint.
* List disciplines.
* Find discipline by ID.
* Update discipline.
* Delete discipline.
* Associate discipline with professor.
* Validate required fields.

**Acceptance Criteria**

* Discipline CRUD works.
* Required fields are validated.
* Discipline can be associated with a professor.
* API returns proper HTTP status codes.

**Suggested labels**

`backend`, `academic-service`, `api`

**Suggested branch**

```bash
feature/discipline-endpoints
```

---

### Issue 4.4 — Implement class endpoints

**Description**

Create REST endpoints to manage classes.

**Tasks**

* Create class endpoint.
* List classes.
* Find class by ID.
* Update class.
* Delete class.
* Associate class with discipline.
* Validate required fields.

**Acceptance Criteria**

* Class CRUD works.
* Class belongs to one discipline.
* Discipline can have many classes.
* API returns proper HTTP status codes.

**Suggested labels**

`backend`, `academic-service`, `api`

**Suggested branch**

```bash
feature/class-endpoints
```

---

### Issue 4.5 — Implement enrollment endpoints

**Description**

Create REST endpoints to manage student enrollments.

**Tasks**

* Create enrollment endpoint.
* Enroll a student in a class.
* List enrollments by student.
* List enrollments by class.
* Update enrollment status.
* Validate duplicated enrollments.
* Validate required fields.

**Acceptance Criteria**

* Student can enroll in a class.
* Enrollment belongs to one student.
* Enrollment belongs to one class.
* Student cannot be enrolled twice in the same class.
* Enrollment status can be updated.

**Suggested labels**

`backend`, `academic-service`, `api`

**Suggested branch**

```bash
feature/enrollment-endpoints
```

---

## Milestone 5 — Activity Service

---

### Issue 5.1 — Set up activity-service project

**Description**

Create the initial TypeScript backend project for the activity service.

**Tasks**

* Initialize the backend project.
* Configure TypeScript.
* Configure project scripts.
* Configure basic folder structure.
* Add health check endpoint.
* Add basic error handling.
* Add basic request logging.

**Acceptance Criteria**

* `activity-service` runs locally.
* TypeScript is configured.
* Health check endpoint returns success.
* Project has a clean folder structure.

**Suggested labels**

`backend`, `activity-service`, `setup`

**Suggested branch**

```bash
feature/activity-service-setup
```

---

### Issue 5.2 — Create activity and submission models

**Description**

Create the data models for academic activities and student submissions.

**Tasks**

* Create `Atividade` model.
* Create `Entrega` model.
* Add relationship between class and activity.
* Add relationship between activity and submission.
* Add relationship between student and submission.
* Configure database integration.

**Acceptance Criteria**

* Activity model is implemented.
* Submission model is implemented.
* Activity belongs to one class.
* Activity can have many submissions.
* Submission belongs to one student.
* Submission belongs to one activity.

**Suggested labels**

`backend`, `database`, `activity-service`

**Suggested branch**

```bash
feature/activity-models
```

---

### Issue 5.3 — Implement activity endpoints

**Description**

Create REST endpoints to manage activities.

**Tasks**

* Create activity endpoint.
* List activities.
* List activities by class.
* Find activity by ID.
* Update activity.
* Delete activity.
* Validate required fields.

**Acceptance Criteria**

* Activity CRUD works.
* Activity belongs to one class.
* Activities can be listed by class.
* API returns proper HTTP status codes.

**Suggested labels**

`backend`, `activity-service`, `api`

**Suggested branch**

```bash
feature/activity-endpoints
```

---

### Issue 5.4 — Implement submission endpoints

**Description**

Create REST endpoints to manage student submissions.

**Tasks**

* Create submission endpoint.
* List submissions.
* List submissions by student.
* List submissions by activity.
* Register submission date.
* Register grade.
* Validate required fields.

**Acceptance Criteria**

* Student can submit an activity.
* Submission belongs to one student.
* Submission belongs to one activity.
* Grade can be registered.
* Submissions can be listed by student or activity.

**Suggested labels**

`backend`, `activity-service`, `api`

**Suggested branch**

```bash
feature/submission-endpoints
```

---

## Milestone 6 — API Gateway and Service Integration

---

### Issue 6.1 — Set up API Gateway project

**Description**

Create the initial API Gateway project responsible for exposing a single entry point to the frontend.

**Tasks**

* Initialize the gateway project.
* Configure TypeScript.
* Configure basic routing.
* Add health check endpoint.
* Add basic request logging.
* Configure environment variables for service URLs.

**Acceptance Criteria**

* Gateway runs locally.
* Gateway has a health check endpoint.
* Gateway can route requests to internal services.
* Service URLs are configurable through environment variables.

**Suggested labels**

`gateway`, `backend`, `setup`

**Suggested branch**

```bash
feature/gateway-setup
```

---

### Issue 6.2 — Configure auth-service routes in Gateway

**Description**

Expose authentication routes through the API Gateway.

**Tasks**

* Create gateway routes for login.
* Create gateway routes for student registration.
* Create gateway routes for professor registration.
* Forward requests to `auth-service`.
* Forward response from `auth-service`.
* Handle service communication errors.

**Acceptance Criteria**

* Auth routes are available through the Gateway.
* Gateway forwards requests correctly.
* Gateway handles service errors properly.
* Frontend does not need direct access to `auth-service`.

**Suggested labels**

`gateway`, `auth-service`, `api`

**Suggested branch**

```bash
feature/gateway-auth-routes
```

---

### Issue 6.3 — Configure academic-service routes in Gateway

**Description**

Expose academic routes through the API Gateway.

**Tasks**

* Create gateway routes for disciplines.
* Create gateway routes for classes.
* Create gateway routes for enrollments.
* Forward requests to `academic-service`.
* Forward authorization header.
* Handle service communication errors.

**Acceptance Criteria**

* Academic routes are available through the Gateway.
* Gateway forwards requests correctly.
* Gateway forwards authentication headers.
* Frontend does not need direct access to `academic-service`.

**Suggested labels**

`gateway`, `academic-service`, `api`

**Suggested branch**

```bash
feature/gateway-academic-routes
```

---

### Issue 6.4 — Configure activity-service routes in Gateway

**Description**

Expose activity and submission routes through the API Gateway.

**Tasks**

* Create gateway routes for activities.
* Create gateway routes for submissions.
* Forward requests to `activity-service`.
* Forward authorization header.
* Handle service communication errors.

**Acceptance Criteria**

* Activity routes are available through the Gateway.
* Submission routes are available through the Gateway.
* Gateway forwards authentication headers.
* Frontend does not need direct access to `activity-service`.

**Suggested labels**

`gateway`, `activity-service`, `api`

**Suggested branch**

```bash
feature/gateway-activity-routes
```

---

## Milestone 7 — CI/CD and GitHub Workflow

---

### Issue 7.1 — Create GitHub Actions workflow

**Description**

Create the initial GitHub Actions workflow to automate project validation.

**Tasks**

* Create workflow file inside `.github/workflows`.
* Run workflow on pull requests.
* Install dependencies.
* Run lint.
* Run tests.
* Run build.
* Validate multiple services when possible.

**Acceptance Criteria**

* GitHub Actions runs on pull requests.
* Build check is automated.
* Lint check is automated.
* Test check is automated.
* Pull requests show validation result.

**Suggested labels**

`ci-cd`, `github-actions`, `devops`

**Suggested branch**

```bash
feature/github-actions-ci
```

---

### Issue 7.2 — Configure pull request review process

**Description**

Document and enforce the pull request review process.

**Tasks**

* Document that all changes must be made through pull requests.
* Document that pull requests must target `develop`.
* Document that at least one review is required.
* Document that checks must pass before merge.
* Add review checklist to PR template.

**Acceptance Criteria**

* Pull request process is documented.
* Team members understand the review workflow.
* Review checklist exists.
* Code review is part of the project process.

**Suggested labels**

`documentation`, `github`, `devops`

**Suggested branch**

```bash
docs/pull-request-review-process
```

---

### Issue 7.3 — Configure issue and milestone workflow

**Description**

Document how issues and milestones should be used during the project.

**Tasks**

* Document issue creation rules.
* Document issue assignment rules.
* Document labels usage.
* Document milestone usage.
* Document how to close issues through pull requests.
* Add examples of issue references in commits and PRs.

**Acceptance Criteria**

* Issue workflow is documented.
* Milestone usage is documented.
* Labels are defined.
* Pull requests can be linked to issues.

**Suggested labels**

`documentation`, `github`, `devops`

**Suggested branch**

```bash
docs/issues-and-milestones-workflow
```

---

## Milestone 8 — Observability and Final Documentation

---

### Issue 8.1 — Add health check endpoints to all services

**Description**

Add health check endpoints to the gateway and all microservices.

**Tasks**

* Add health check to `auth-service`.
* Add health check to `academic-service`.
* Add health check to `activity-service`.
* Add health check to `gateway`.
* Document all health check routes.

**Acceptance Criteria**

* Every service has a health check endpoint.
* Health check returns service status.
* Health check can be used by Docker Compose.
* Routes are documented.

**Suggested labels**

`observability`, `backend`, `api`

**Suggested branch**

```bash
feature/health-check-endpoints
```

---

### Issue 8.2 — Add basic logging

**Description**

Add basic request and error logging to improve observability.

**Tasks**

* Add request logs to each service.
* Add error logs to each service.
* Add logs to the API Gateway.
* Include method, route, status code and timestamp.
* Avoid logging sensitive data such as passwords or tokens.

**Acceptance Criteria**

* Services log incoming requests.
* Services log errors.
* Logs do not expose sensitive information.
* Logs help identify basic runtime problems.

**Suggested labels**

`observability`, `logging`, `backend`

**Suggested branch**

```bash
feature/basic-logging
```

---

### Issue 8.3 — Create monitoring structure

**Description**

Create the initial monitoring structure inside the infrastructure folder.

**Tasks**

* Create `infra/monitoring`.
* Add monitoring documentation.
* Optionally add Prometheus configuration.
* Optionally add Grafana configuration.
* Document what can be monitored.
* Document future observability improvements.

**Acceptance Criteria**

* Monitoring folder exists.
* Monitoring strategy is documented.
* Basic observability requirements are covered.
* Future improvements are described.

**Suggested labels**

`observability`, `infra`, `documentation`

**Suggested branch**

```bash
docs/monitoring-structure
```

---

### Issue 8.4 — Complete final README documentation

**Description**

Complete the final project documentation for delivery.

**Tasks**

* Explain project objective.
* Explain architecture.
* Explain services.
* Explain how to run with Docker Compose.
* Explain environment variables.
* Explain Git Flow.
* Explain pull request workflow.
* Explain CI/CD pipeline.
* Explain observability strategy.
* Add API route summary.
* Add project structure.

**Acceptance Criteria**

* README is complete.
* README explains how to run the project.
* README explains architecture and services.
* README documents DevOps practices.
* README is suitable for final academic delivery.

**Suggested labels**

`documentation`, `final-delivery`

**Suggested branch**

```bash
docs/final-readme
```

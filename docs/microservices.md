# Microservices Responsibilities

## Academic Management Platform

This document defines the responsibilities, entities, expected endpoints and boundaries of each microservice in the Academic Management Platform.

The platform is divided into three main backend services:

* `auth-service`
* `academic-service`
* `activity-service`

Each service owns a specific business domain and must be developed, deployed and executed independently.

---

## 1. Auth Service

## Purpose

The `auth-service` is responsible for user management and authentication.

This service manages the basic user data used by the platform, including students and professors. It is also responsible for login, password security and token generation.

## Owned Entities

The `auth-service` owns the following entities:

```text
User
Student
Professor
```

## Entity Responsibilities

### User

Represents the base user of the platform.

Attributes:

```text
id
name
email
password
type
```

### Student

Represents a student user.

`Student` inherits the basic data from `User`.

Additional attributes:

```text
registrationNumber
course
```

### Professor

Represents a professor user.

`Professor` inherits the basic data from `User`.

Additional attributes:

```text
employeeNumber
department
```

## Main Responsibilities

The `auth-service` is responsible for:

* Registering students.
* Registering professors.
* Managing user credentials.
* Hashing passwords before saving them.
* Authenticating users.
* Generating JWT tokens.
* Validating authenticated users.
* Returning basic user profile information.
* Managing user type information.

## Expected Endpoints

```text
POST /auth/students
POST /auth/professors
POST /auth/login
GET /auth/me
GET /auth/health
```

---

## 2. Academic Service

## Purpose

The `academic-service` is responsible for managing the academic structure of the platform.

This service handles courses, classes and enrollments.

## Owned Entities

The `academic-service` owns the following entities:

```text
Course
Class
Enrollment
```

## Entity Responsibilities

### Course

Represents an academic course or discipline.

Attributes:

```text
id
name
code
workload
professorId
```

The `professorId` references a professor from the `auth-service`.

### Class

Represents a class of a course.

Attributes:

```text
id
semester
schedule
courseId
```

The `courseId` references a course from the same service.

### Enrollment

Represents the enrollment of a student in a class.

Attributes:

```text
id
date
status
studentId
classId
```

The `studentId` references a student from the `auth-service`.

The `classId` references a class from the same service.

## Main Responsibilities

The `academic-service` is responsible for:

* Creating courses.
* Listing courses.
* Updating courses.
* Deleting courses.
* Associating professors with courses.
* Creating classes.
* Listing classes.
* Updating classes.
* Deleting classes.
* Associating classes with courses.
* Enrolling students in classes.
* Listing enrollments by student.
* Listing enrollments by class.
* Updating enrollment status.

## Expected Endpoints

```text
POST /courses
GET /courses
GET /courses/:id
PUT /courses/:id
DELETE /courses/:id

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

## 3. Activity Service

## Purpose

The `activity-service` is responsible for managing academic activities, student submissions and grades.

This service handles the activities created for classes and the submissions made by students.

## Owned Entities

The `activity-service` owns the following entities:

```text
Activity
Submission
```

## Entity Responsibilities

### Activity

Represents an academic activity assigned to a class.

Attributes:

```text
id
title
description
deadline
classId
```

The `classId` references a class from the `academic-service`.

### Submission

Represents a student submission for an activity.

Attributes:

```text
id
submissionDate
grade
activityId
studentId
```

The `activityId` references an activity from the same service.

The `studentId` references a student from the `auth-service`.

## Main Responsibilities

The `activity-service` is responsible for:

* Creating activities.
* Listing activities.
* Listing activities by class.
* Managing activity deadlines.
* Updating activities.
* Deleting activities.
* Creating student submissions.
* Listing submissions by student.
* Listing submissions by activity.
* Registering submission dates.
* Registering grades.

## Expected Endpoints

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

## Service Ownership Summary

| Service            | Owns Entities             | Main Responsibility                |
| ------------------ | ------------------------- | ---------------------------------- |
| `auth-service`     | User, Student, Professor  | Authentication and user management |
| `academic-service` | Course, Class, Enrollment | Academic structure and enrollments |
| `activity-service` | Activity, Submission      | Activities, submissions and grades |

---

## Cross-Service References

Some services need to store references to entities owned by other services.

| Field         | Stored In          | References                    |
| ------------- | ------------------ | ----------------------------- |
| `studentId`   | `academic-service` | Student from `auth-service`   |
| `professorId` | `academic-service` | Professor from `auth-service` |
| `classId`     | `activity-service` | Class from `academic-service` |
| `studentId`   | `activity-service` | Student from `auth-service`   |

These references are stored only as identifiers.

A service must not directly access another service database.

---

## Communication Rules

The platform follows these communication rules:

* The frontend communicates only with the API Gateway.
* The API Gateway forwards requests to the correct microservice.
* Each microservice owns its own database.
* Services do not share database tables.
* Services do not directly access each other’s databases.
* Services may communicate through REST APIs when validation is required.
* Authentication data is handled only by the `auth-service`.
* Academic structure data is handled only by the `academic-service`.
* Activity and submission data is handled only by the `activity-service`.

---

## API Gateway Route Mapping

The API Gateway should expose routes using a consistent prefix strategy.

```text
/api/auth/*        → auth-service
/api/academic/*    → academic-service
/api/activities/*  → activity-service
```

Example:

```text
POST /api/auth/login
        ↓
POST /auth/login in auth-service
```

```text
GET /api/academic/courses
        ↓
GET /courses in academic-service
```

```text
POST /api/activities/submissions
        ↓
POST /submissions in activity-service
```

---

## Database Ownership

Each service should have its own database.

```text
auth-service      → auth_db
academic-service  → academic_db
activity-service  → activity_db
```

This strategy reduces coupling between services and keeps each business domain independent.

---

## Summary

The microservices were divided according to business responsibility:

* `auth-service` handles identity and authentication.
* `academic-service` handles courses, classes and enrollments.
* `activity-service` handles activities, submissions and grades.

This separation supports scalability, maintainability, independent deployment and clear service boundaries.

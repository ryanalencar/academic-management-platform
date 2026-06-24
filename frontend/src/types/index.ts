export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: string;
}

export interface Student extends User {
  registrationNumber: string;
  course: string;
}

export interface Professor extends User {
  employeeNumber: string;
  department: string;
}

export interface Discipline {
  id: string;
  name: string;
  code: string;
  workload: number;
  professorId?: string;
}

export interface Class {
  id: string;
  semester: string;
  schedule: string;
  disciplineId: string;
  discipline?: Discipline;
}

export interface Enrollment {
  id: string;
  date: string;
  status: EnrollmentStatus;
  studentId: string;
  classId: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
}

export interface Submission {
  id: string;
  submittedAt: string;
  grade: number | null;
  activityId: string;
  studentId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterStudentRequest {
  name: string;
  email: string;
  password: string;
  registrationNumber: string;
  course: string;
}

export interface RegisterProfessorRequest {
  name: string;
  email: string;
  password: string;
  employeeNumber: string;
  department: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

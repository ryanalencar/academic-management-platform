export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Student extends User {
  registrationNumber: string;
  course: string;
}

export interface Professor extends User {
  siape: string;
  department: string;
}

export interface Discipline {
  id: string;
  nome: string;
  codigo: string;
  cargaHoraria: number;
}

export interface Class {
  id: string;
  semestre: string;
  horario: string;
  disciplineId: string;
  discipline?: Discipline;
}

export interface Enrollment {
  id: string;
  data: string;
  status: EnrollmentStatus;
  studentId: string;
  classId: string;
}

export interface Activity {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  classId: string;
}

export interface Submission {
  id: string;
  dataEntrega: string;
  nota: number | null;
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
  siape: string;
  department: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

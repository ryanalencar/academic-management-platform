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
  nome: string;
  email: string;
  tipo: UserRole;
}

export interface Student extends User {
  matricula: string;
  curso: string;
}

export interface Professor extends User {
  siape: string;
  departamento: string;
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
  senha: string;
}

export interface RegisterStudentRequest {
  nome: string;
  email: string;
  senha: string;
  matricula: string;
  curso: string;
}

export interface RegisterProfessorRequest {
  nome: string;
  email: string;
  senha: string;
  siape: string;
  departamento: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

import api from './api';
import type {
  LoginRequest,
  RegisterStudentRequest,
  RegisterProfessorRequest,
  AuthResponse,
} from '../types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async registerStudent(data: RegisterStudentRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register/student', data);
    return response.data;
  },

  async registerProfessor(data: RegisterProfessorRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register/professor', data);
    return response.data;
  },
};

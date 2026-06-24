import api from './api';
import type { Enrollment } from '../types';

export const enrollmentService = {
  async listByStudent(studentId: string): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/academic/enrollments/student/${studentId}`);
    return response.data;
  },

  async listByClass(classId: string): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>(`/academic/enrollments/class/${classId}`);
    return response.data;
  },

  async create(data: { classId: string; studentId: string }): Promise<Enrollment> {
    const response = await api.post<Enrollment>('/academic/enrollments', data);
    return response.data;
  },

  async updateStatus(id: string, status: string): Promise<Enrollment> {
    const response = await api.patch<Enrollment>(`/academic/enrollments/${id}/status`, { status });
    return response.data;
  },
};

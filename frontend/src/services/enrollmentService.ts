import api from './api';
import type { Enrollment } from '../types';

export const enrollmentService = {
  async list(): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>('/academic/enrollments');
    return response.data;
  },

  async create(data: { classId: string }): Promise<Enrollment> {
    const response = await api.post<Enrollment>('/academic/enrollments', data);
    return response.data;
  },

  async updateStatus(id: string, status: string): Promise<Enrollment> {
    const response = await api.patch<Enrollment>(`/academic/enrollments/${id}`, { status });
    return response.data;
  },
};

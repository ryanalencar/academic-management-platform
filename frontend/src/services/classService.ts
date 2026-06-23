import api from './api';
import type { Class } from '../types';

export const classService = {
  async list(): Promise<Class[]> {
    const response = await api.get<Class[]>('/academic/classes');
    return response.data;
  },

  async getById(id: string): Promise<Class> {
    const response = await api.get<Class>(`/academic/classes/${id}`);
    return response.data;
  },

  async create(data: Omit<Class, 'id'>): Promise<Class> {
    const response = await api.post<Class>('/academic/classes', data);
    return response.data;
  },

  async update(id: string, data: Partial<Class>): Promise<Class> {
    const response = await api.patch<Class>(`/academic/classes/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/academic/classes/${id}`);
  },
};

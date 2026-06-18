import api from './api';
import type { Discipline } from '../types';

export const disciplineService = {
  async list(): Promise<Discipline[]> {
    const response = await api.get<Discipline[]>('/academic/disciplines');
    return response.data;
  },

  async getById(id: string): Promise<Discipline> {
    const response = await api.get<Discipline>(`/academic/disciplines/${id}`);
    return response.data;
  },

  async create(data: Omit<Discipline, 'id'>): Promise<Discipline> {
    const response = await api.post<Discipline>('/academic/disciplines', data);
    return response.data;
  },

  async update(id: string, data: Partial<Discipline>): Promise<Discipline> {
    const response = await api.patch<Discipline>(`/academic/disciplines/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/academic/disciplines/${id}`);
  },
};

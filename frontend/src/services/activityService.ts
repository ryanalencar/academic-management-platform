import api from './api';
import type { Activity } from '../types';

export const activityService = {
  async list(classId?: string): Promise<Activity[]> {
    const url = classId ? `/activities?classId=${classId}` : '/activities';
    const response = await api.get<Activity[]>(url);
    return response.data;
  },

  async getById(id: string): Promise<Activity> {
    const response = await api.get<Activity>(`/activities/${id}`);
    return response.data;
  },

  async create(data: Omit<Activity, 'id'>): Promise<Activity> {
    const response = await api.post<Activity>('/activities', data);
    return response.data;
  },

  async update(id: string, data: Partial<Activity>): Promise<Activity> {
    const response = await api.patch<Activity>(`/activities/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/activities/${id}`);
  },
};

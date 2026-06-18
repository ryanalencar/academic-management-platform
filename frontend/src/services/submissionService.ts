import api from './api';
import type { Submission } from '../types';

export const submissionService = {
  async list(activityId?: string): Promise<Submission[]> {
    const url = activityId ? `/submissions?activityId=${activityId}` : '/submissions';
    const response = await api.get<Submission[]>(url);
    return response.data;
  },

  async create(data: { activityId: string; content?: string }): Promise<Submission> {
    const response = await api.post<Submission>('/submissions', data);
    return response.data;
  },

  async grade(id: string, nota: number): Promise<Submission> {
    const response = await api.patch<Submission>(`/submissions/${id}`, { nota });
    return response.data;
  },
};

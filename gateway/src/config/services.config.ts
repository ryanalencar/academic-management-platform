import { registerAs } from '@nestjs/config';

export type ServicesConfig = {
  authServiceUrl: string;
  academicServiceUrl: string;
  activityServiceUrl: string;
};

export const servicesConfig = registerAs(
  'services',
  (): ServicesConfig => ({
    authServiceUrl: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
    academicServiceUrl:
      process.env.ACADEMIC_SERVICE_URL ?? 'http://localhost:3002',
    activityServiceUrl:
      process.env.ACTIVITY_SERVICE_URL ?? 'http://localhost:3003',
  }),
);
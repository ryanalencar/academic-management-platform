import { UserType } from 'prisma/generated/client';

export type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  createdAt: Date;
  student?: {
    id: string;
    registrationNumber: string;
    course: string;
  } | null;
  professor?: {
    id: string;
    employeeNumber: string;
    department: string;
  } | null;
};

import { UserType } from 'src/generated/prisma/enums';

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

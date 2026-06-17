import { UserType } from 'src/generated/prisma/enums';

export type JwtPayload = {
  sub: string;
  email: string;
  type: UserType;
};

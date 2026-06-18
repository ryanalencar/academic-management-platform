export type JwtPayload = {
  sub: string;
  email: string;
  type: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
};

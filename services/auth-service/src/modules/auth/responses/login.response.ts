import { AuthUserResponse } from './auth-user.response';

export type LoginResponse = {
  accessToken: string;
  user: AuthUserResponse;
};

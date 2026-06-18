import { ApiProperty } from '@nestjs/swagger';
import { AuthUserResponse } from './auth-user.response';

export class LoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({ type: AuthUserResponse })
  user!: AuthUserResponse;
}

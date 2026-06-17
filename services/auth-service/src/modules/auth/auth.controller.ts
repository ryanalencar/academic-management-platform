import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { AuthUserResponse } from './responses/auth-user.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('students')
  registerStudent(
    @Body() registerStudentDto: RegisterStudentDto,
  ): Promise<AuthUserResponse> {
    return this.authService.registerStudent(registerStudentDto);
  }

  @Post('professors')
  registerProfessor(
    @Body() registerProfessorDto: RegisterProfessorDto,
  ): Promise<AuthUserResponse> {
    return this.authService.registerProfessor(registerProfessorDto);
  }
}

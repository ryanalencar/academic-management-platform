import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthUserResponse } from './responses/auth-user.response';
import { LoginResponse } from './responses/login.response';
import { JwtPayload } from './types/jwt-payload.type';

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

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() currentUser: JwtPayload): Promise<AuthUserResponse> {
    return this.authService.getAuthenticatedUser(currentUser.sub);
  }
}

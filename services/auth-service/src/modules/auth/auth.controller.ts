import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthUserResponse } from './responses/auth-user.response';
import { LoginResponse } from './responses/login.response';
import { JwtPayload } from './types/jwt-payload.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('students')
  @ApiOperation({ summary: 'Register a new student account' })
  @ApiBody({ type: RegisterStudentDto })
  @ApiCreatedResponse({
    description: 'Student account created successfully.',
    type: AuthUserResponse,
  })
  @ApiConflictResponse({ description: 'Email is already in use.' })
  registerStudent(
    @Body() registerStudentDto: RegisterStudentDto,
  ): Promise<AuthUserResponse> {
    return this.authService.registerStudent(registerStudentDto);
  }

  @Post('professors')
  @ApiOperation({ summary: 'Register a new professor account' })
  @ApiBody({ type: RegisterProfessorDto })
  @ApiCreatedResponse({
    description: 'Professor account created successfully.',
    type: AuthUserResponse,
  })
  @ApiConflictResponse({ description: 'Email is already in use.' })
  registerProfessor(
    @Body() registerProfessorDto: RegisterProfessorDto,
  ): Promise<AuthUserResponse> {
    return this.authService.registerProfessor(registerProfessorDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return a JWT' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User authenticated successfully.',
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password.' })
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({
    description: 'Authenticated user profile.',
    type: AuthUserResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Missing, invalid, or expired JWT.' })
  getMe(@CurrentUser() currentUser: JwtPayload): Promise<AuthUserResponse> {
    return this.authService.getAuthenticatedUser(currentUser.sub);
  }
}

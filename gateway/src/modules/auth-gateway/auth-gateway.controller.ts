import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGatewayService } from './auth-gateway.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';

@Controller('api/auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res() response: Response,
  ): Promise<void> {
    const authResponse = await this.authGatewayService.login(loginDto);

    response.status(authResponse.statusCode).json(authResponse.data);
  }

  @Post('students')
  @HttpCode(HttpStatus.CREATED)
  async registerStudent(
    @Body() registerStudentDto: RegisterStudentDto,
    @Res() response: Response,
  ): Promise<void> {
    const authResponse =
      await this.authGatewayService.registerStudent(registerStudentDto);

    response.status(authResponse.statusCode).json(authResponse.data);
  }

  @Post('professors')
  @HttpCode(HttpStatus.CREATED)
  async registerProfessor(
    @Body() registerProfessorDto: RegisterProfessorDto,
    @Res() response: Response,
  ): Promise<void> {
    const authResponse =
      await this.authGatewayService.registerProfessor(registerProfessorDto);

    response.status(authResponse.statusCode).json(authResponse.data);
  }
}
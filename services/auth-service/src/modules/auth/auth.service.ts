import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { AuthUserResponse } from './responses/auth-user.response';
import { UserType } from 'prisma/generated/client';

const PASSWORD_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerStudent(dto: RegisterStudentDto): Promise<AuthUserResponse> {
    await this.ensureEmailIsAvailable(dto.email);

    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          type: UserType.STUDENT,
          student: {
            create: {
              registrationNumber: dto.registrationNumber,
              course: dto.course,
            },
          },
        },
        include: {
          student: true,
          professor: true,
        },
      });

      return this.toAuthUserResponse(user);
    } catch {
      throw new InternalServerErrorException('Could not register student');
    }
  }

  async registerProfessor(
    dto: RegisterProfessorDto,
  ): Promise<AuthUserResponse> {
    await this.ensureEmailIsAvailable(dto.email);

    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          type: UserType.PROFESSOR,
          professor: {
            create: {
              employeeNumber: dto.employeeNumber,
              department: dto.department,
            },
          },
        },
        include: {
          student: true,
          professor: true,
        },
      });

      return this.toAuthUserResponse(user);
    } catch {
      throw new InternalServerErrorException('Could not register professor');
    }
  }

  private async ensureEmailIsAvailable(email: string): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  }

  private toAuthUserResponse(user: {
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
  }): AuthUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      student: user.student
        ? {
            id: user.student.id,
            registrationNumber: user.student.registrationNumber,
            course: user.student.course,
          }
        : null,
      professor: user.professor
        ? {
            id: user.professor.id,
            employeeNumber: user.professor.employeeNumber,
            department: user.professor.department,
          }
        : null,
    };
  }
}

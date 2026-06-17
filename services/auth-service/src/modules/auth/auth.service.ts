import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterProfessorDto } from './dto/register-professor.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { AuthUserResponse } from './responses/auth-user.response';
import { LoginResponse } from './responses/login.response';
import { JwtPayload } from './types/jwt-payload.type';

const PASSWORD_SALT_ROUNDS = 10;

type UserWithRelations = {
  id: string;
  name: string;
  email: string;
  password?: string;
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

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        student: true,
        professor: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      type: user.type,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: this.toAuthUserResponse(user),
    };
  }

  async getAuthenticatedUser(userId: string): Promise<AuthUserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        student: true,
        professor: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toAuthUserResponse(user);
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

  private toAuthUserResponse(user: UserWithRelations): AuthUserResponse {
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

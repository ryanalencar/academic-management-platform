import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Enrollment } from 'src/generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    await this.ensureClassExists(dto.classId);
    await this.ensureStudentIsNotEnrolled(dto.studentId, dto.classId);

    return this.prismaService.enrollment.create({
      data: {
        studentId: dto.studentId,
        classId: dto.classId,
      },
    });
  }

  findByStudent(studentId: string): Promise<Enrollment[]> {
    return this.prismaService.enrollment.findMany({
      where: {
        studentId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findByClass(classId: string): Promise<Enrollment[]> {
    await this.ensureClassExists(classId);

    return this.prismaService.enrollment.findMany({
      where: {
        classId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async updateStatus(
    id: string,
    dto: UpdateEnrollmentStatusDto,
  ): Promise<Enrollment> {
    await this.findById(id);

    return this.prismaService.enrollment.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },
    });
  }

  private async findById(id: string): Promise<Enrollment> {
    const enrollment = await this.prismaService.enrollment.findUnique({
      where: {
        id,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }

  private async ensureClassExists(classId: string): Promise<void> {
    const academicClass = await this.prismaService.class.findUnique({
      where: {
        id: classId,
      },
      select: {
        id: true,
      },
    });

    if (!academicClass) {
      throw new NotFoundException('Class not found');
    }
  }

  private async ensureStudentIsNotEnrolled(
    studentId: string,
    classId: string,
  ): Promise<void> {
    const enrollment = await this.prismaService.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
      select: {
        id: true,
      },
    });

    if (enrollment) {
      throw new ConflictException('Student is already enrolled in this class');
    }
  }
}

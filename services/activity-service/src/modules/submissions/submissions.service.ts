import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionGradeDto } from './dto/update-submission-grade.dto';
import { SubmissionResponse } from './responses/submission.response';

type SubmissionModel = {
  id: string;
  submittedAt: Date;
  grade: number | null;
  activityId: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class SubmissionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSubmissionDto): Promise<SubmissionResponse> {
    await this.ensureActivityExists(dto.activityId);
    await this.ensureSubmissionDoesNotExist(dto.activityId, dto.studentId);

    const submission = await this.prismaService.submission.create({
      data: {
        activityId: dto.activityId,
        studentId: dto.studentId,
        submittedAt: dto.submittedAt ? new Date(dto.submittedAt) : new Date(),
      },
    });

    return this.toSubmissionResponse(submission);
  }

  async findAll(): Promise<SubmissionResponse[]> {
    const submissions = await this.prismaService.submission.findMany({
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return submissions.map((submission) =>
      this.toSubmissionResponse(submission),
    );
  }

  async findByStudent(studentId: string): Promise<SubmissionResponse[]> {
    const submissions = await this.prismaService.submission.findMany({
      where: {
        studentId,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return submissions.map((submission) =>
      this.toSubmissionResponse(submission),
    );
  }

  async findByActivity(activityId: string): Promise<SubmissionResponse[]> {
    await this.ensureActivityExists(activityId);

    const submissions = await this.prismaService.submission.findMany({
      where: {
        activityId,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return submissions.map((submission) =>
      this.toSubmissionResponse(submission),
    );
  }

  async updateGrade(
    id: string,
    dto: UpdateSubmissionGradeDto,
  ): Promise<SubmissionResponse> {
    await this.ensureSubmissionExists(id);

    const submission = await this.prismaService.submission.update({
      where: {
        id,
      },
      data: {
        grade: dto.grade,
      },
    });

    return this.toSubmissionResponse(submission);
  }

  private async ensureActivityExists(activityId: string): Promise<void> {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id: activityId,
      },
      select: {
        id: true,
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
  }

  private async ensureSubmissionExists(id: string): Promise<void> {
    const submission = await this.prismaService.submission.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
  }

  private async ensureSubmissionDoesNotExist(
    activityId: string,
    studentId: string,
  ): Promise<void> {
    const submission = await this.prismaService.submission.findUnique({
      where: {
        activityId_studentId: {
          activityId,
          studentId,
        },
      },
      select: {
        id: true,
      },
    });

    if (submission) {
      throw new ConflictException(
        'Student has already submitted this activity',
      );
    }
  }

  private toSubmissionResponse(
    submission: SubmissionModel,
  ): SubmissionResponse {
    return {
      id: submission.id,
      submittedAt: submission.submittedAt,
      grade: submission.grade,
      activityId: submission.activityId,
      studentId: submission.studentId,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
    };
  }
}

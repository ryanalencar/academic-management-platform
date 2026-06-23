import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityResponse } from './responses/activity.response';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActivityDto): Promise<ActivityResponse> {
    const activity = await this.prismaService.activity.create({
      data: {
        title: dto.title,
        description: dto.description,
        deadline: new Date(dto.deadline),
        classId: dto.classId,
      },
    });

    return this.toActivityResponse(activity);
  }

  async findAll(): Promise<ActivityResponse[]> {
    const activities = await this.prismaService.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return activities.map((activity) => this.toActivityResponse(activity));
  }

  async findByClass(classId: string): Promise<ActivityResponse[]> {
    const activities = await this.prismaService.activity.findMany({
      where: {
        classId,
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    return activities.map((activity) => this.toActivityResponse(activity));
  }

  async findById(id: string): Promise<ActivityResponse> {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id,
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return this.toActivityResponse(activity);
  }

  async update(id: string, dto: UpdateActivityDto): Promise<ActivityResponse> {
    await this.ensureActivityExists(id);

    const activity = await this.prismaService.activity.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        classId: dto.classId,
      },
    });

    return this.toActivityResponse(activity);
  }

  async delete(id: string): Promise<void> {
    await this.ensureActivityExists(id);

    await this.prismaService.activity.delete({
      where: {
        id,
      },
    });
  }

  private async ensureActivityExists(id: string): Promise<void> {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
  }

  private toActivityResponse(activity: ActivityResponse): ActivityResponse {
    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      deadline: activity.deadline,
      classId: activity.classId,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
    };
  }
}

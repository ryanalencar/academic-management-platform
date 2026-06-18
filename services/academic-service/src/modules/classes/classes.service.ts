import { Injectable, NotFoundException } from '@nestjs/common';
import type { Class as AcademicClass } from 'src/generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AssociateDisciplineDto } from './dto/associate-discipline.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateClassDto): Promise<AcademicClass> {
    await this.ensureDisciplineExists(dto.disciplineId);

    return this.prismaService.class.create({
      data: {
        semester: dto.semester,
        schedule: dto.schedule,
        disciplineId: dto.disciplineId,
      },
    });
  }

  findAll(): Promise<AcademicClass[]> {
    return this.prismaService.class.findMany({
      orderBy: [
        {
          semester: 'asc',
        },
        {
          schedule: 'asc',
        },
      ],
    });
  }

  async findById(id: string): Promise<AcademicClass> {
    const academicClass = await this.prismaService.class.findUnique({
      where: {
        id,
      },
    });

    if (!academicClass) {
      throw new NotFoundException('Class not found');
    }

    return academicClass;
  }

  async update(id: string, dto: UpdateClassDto): Promise<AcademicClass> {
    await this.findById(id);

    if (dto.disciplineId) {
      await this.ensureDisciplineExists(dto.disciplineId);
    }

    return this.prismaService.class.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async associateDiscipline(
    id: string,
    dto: AssociateDisciplineDto,
  ): Promise<AcademicClass> {
    await this.findById(id);
    await this.ensureDisciplineExists(dto.disciplineId);

    return this.prismaService.class.update({
      where: {
        id,
      },
      data: {
        disciplineId: dto.disciplineId,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prismaService.class.delete({
      where: {
        id,
      },
    });
  }

  private async ensureDisciplineExists(disciplineId: string): Promise<void> {
    const discipline = await this.prismaService.discipline.findUnique({
      where: {
        id: disciplineId,
      },
      select: {
        id: true,
      },
    });

    if (!discipline) {
      throw new NotFoundException('Discipline not found');
    }
  }
}

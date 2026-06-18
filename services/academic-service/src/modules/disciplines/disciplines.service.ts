import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Discipline } from 'src/generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AssociateProfessorDto } from './dto/associate-professor.dto';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplinesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateDisciplineDto): Promise<Discipline> {
    await this.ensureCodeIsAvailable(dto.code);

    return this.prismaService.discipline.create({
      data: {
        name: dto.name,
        code: dto.code,
        workload: dto.workload,
        professorId: dto.professorId,
      },
    });
  }

  findAll(): Promise<Discipline[]> {
    return this.prismaService.discipline.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string): Promise<Discipline> {
    const discipline = await this.prismaService.discipline.findUnique({
      where: {
        id,
      },
    });

    if (!discipline) {
      throw new NotFoundException('Discipline not found');
    }

    return discipline;
  }

  async update(id: string, dto: UpdateDisciplineDto): Promise<Discipline> {
    await this.findById(id);

    if (dto.code) {
      await this.ensureCodeIsAvailable(dto.code, id);
    }

    return this.prismaService.discipline.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async associateProfessor(
    id: string,
    dto: AssociateProfessorDto,
  ): Promise<Discipline> {
    await this.findById(id);

    return this.prismaService.discipline.update({
      where: {
        id,
      },
      data: {
        professorId: dto.professorId,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    await this.prismaService.discipline.delete({
      where: {
        id,
      },
    });
  }

  private async ensureCodeIsAvailable(
    code: string,
    currentDisciplineId?: string,
  ): Promise<void> {
    const existingDiscipline = await this.prismaService.discipline.findFirst({
      where: {
        code,
        id: currentDisciplineId
          ? {
              not: currentDisciplineId,
            }
          : undefined,
      },
      select: {
        id: true,
      },
    });

    if (existingDiscipline) {
      throw new ConflictException('Discipline code is already in use');
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Discipline } from 'src/generated/prisma/client';
import { DisciplinesService } from './disciplines.service';
import { AssociateProfessorDto } from './dto/associate-professor.dto';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { DisciplineResponse } from './responses/discipline.response';

@ApiTags('Disciplines')
@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a discipline' })
  @ApiBody({ type: CreateDisciplineDto })
  @ApiCreatedResponse({
    description: 'Discipline created successfully.',
    type: DisciplineResponse,
  })
  @ApiConflictResponse({ description: 'Discipline code is already in use.' })
  create(@Body() dto: CreateDisciplineDto): Promise<Discipline> {
    return this.disciplinesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List disciplines' })
  @ApiOkResponse({
    description: 'Disciplines returned successfully.',
    type: DisciplineResponse,
    isArray: true,
  })
  findAll(): Promise<Discipline[]> {
    return this.disciplinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a discipline by ID' })
  @ApiOkResponse({
    description: 'Discipline returned successfully.',
    type: DisciplineResponse,
  })
  @ApiNotFoundResponse({ description: 'Discipline not found.' })
  findById(@Param('id') id: string): Promise<Discipline> {
    return this.disciplinesService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a discipline' })
  @ApiBody({ type: UpdateDisciplineDto })
  @ApiOkResponse({
    description: 'Discipline updated successfully.',
    type: DisciplineResponse,
  })
  @ApiNotFoundResponse({ description: 'Discipline not found.' })
  @ApiConflictResponse({ description: 'Discipline code is already in use.' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDisciplineDto,
  ): Promise<Discipline> {
    return this.disciplinesService.update(id, dto);
  }

  @Patch(':id/professor')
  @ApiOperation({ summary: 'Associate a discipline with a professor' })
  @ApiBody({ type: AssociateProfessorDto })
  @ApiOkResponse({
    description: 'Professor associated with discipline successfully.',
    type: DisciplineResponse,
  })
  @ApiNotFoundResponse({ description: 'Discipline not found.' })
  associateProfessor(
    @Param('id') id: string,
    @Body() dto: AssociateProfessorDto,
  ): Promise<Discipline> {
    return this.disciplinesService.associateProfessor(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a discipline' })
  @ApiNoContentResponse({ description: 'Discipline deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Discipline not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.disciplinesService.remove(id);
  }
}

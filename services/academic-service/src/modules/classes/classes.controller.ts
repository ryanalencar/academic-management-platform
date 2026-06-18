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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Class as AcademicClass } from 'src/generated/prisma/client';
import { ClassesService } from './classes.service';
import { AssociateDisciplineDto } from './dto/associate-discipline.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassResponse } from './responses/class.response';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a class' })
  @ApiBody({ type: CreateClassDto })
  @ApiCreatedResponse({
    description: 'Class created successfully.',
    type: ClassResponse,
  })
  @ApiNotFoundResponse({ description: 'Discipline not found.' })
  create(@Body() dto: CreateClassDto): Promise<AcademicClass> {
    return this.classesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List classes' })
  @ApiOkResponse({
    description: 'Classes returned successfully.',
    type: ClassResponse,
    isArray: true,
  })
  findAll(): Promise<AcademicClass[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a class by ID' })
  @ApiOkResponse({
    description: 'Class returned successfully.',
    type: ClassResponse,
  })
  @ApiNotFoundResponse({ description: 'Class not found.' })
  findById(@Param('id') id: string): Promise<AcademicClass> {
    return this.classesService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a class' })
  @ApiBody({ type: UpdateClassDto })
  @ApiOkResponse({
    description: 'Class updated successfully.',
    type: ClassResponse,
  })
  @ApiNotFoundResponse({ description: 'Class or discipline not found.' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateClassDto,
  ): Promise<AcademicClass> {
    return this.classesService.update(id, dto);
  }

  @Patch(':id/discipline')
  @ApiOperation({ summary: 'Associate a class with a discipline' })
  @ApiBody({ type: AssociateDisciplineDto })
  @ApiOkResponse({
    description: 'Discipline associated with class successfully.',
    type: ClassResponse,
  })
  @ApiNotFoundResponse({ description: 'Class or discipline not found.' })
  associateDiscipline(
    @Param('id') id: string,
    @Body() dto: AssociateDisciplineDto,
  ): Promise<AcademicClass> {
    return this.classesService.associateDiscipline(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a class' })
  @ApiNoContentResponse({ description: 'Class deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Class not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.classesService.remove(id);
  }
}

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Enrollment } from 'src/generated/prisma/client';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentStatusDto } from './dto/update-enrollment-status.dto';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentResponse } from './responses/enrollment.response';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll a student in a class' })
  @ApiBody({ type: CreateEnrollmentDto })
  @ApiCreatedResponse({
    description: 'Student enrolled successfully.',
    type: EnrollmentResponse,
  })
  @ApiNotFoundResponse({ description: 'Class not found.' })
  @ApiConflictResponse({
    description: 'Student is already enrolled in this class.',
  })
  create(@Body() dto: CreateEnrollmentDto): Promise<Enrollment> {
    return this.enrollmentsService.create(dto);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'List enrollments by student' })
  @ApiOkResponse({
    description: 'Student enrollments returned successfully.',
    type: EnrollmentResponse,
    isArray: true,
  })
  findByStudent(@Param('studentId') studentId: string): Promise<Enrollment[]> {
    return this.enrollmentsService.findByStudent(studentId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'List enrollments by class' })
  @ApiOkResponse({
    description: 'Class enrollments returned successfully.',
    type: EnrollmentResponse,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Class not found.' })
  findByClass(@Param('classId') classId: string): Promise<Enrollment[]> {
    return this.enrollmentsService.findByClass(classId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update enrollment status' })
  @ApiBody({ type: UpdateEnrollmentStatusDto })
  @ApiOkResponse({
    description: 'Enrollment status updated successfully.',
    type: EnrollmentResponse,
  })
  @ApiNotFoundResponse({ description: 'Enrollment not found.' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateEnrollmentStatusDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.updateStatus(id, dto);
  }
}

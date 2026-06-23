import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionGradeDto } from './dto/update-submission-grade.dto';
import { SubmissionResponse } from './responses/submission.response';
import { SubmissionsService } from './submissions.service';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create submission',
    description: 'Creates a student submission for an activity.',
  })
  @ApiCreatedResponse({
    description: 'Submission created successfully.',
    type: SubmissionResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload.',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found.',
  })
  @ApiConflictResponse({
    description: 'Student has already submitted this activity.',
  })
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
  ): Promise<SubmissionResponse> {
    return this.submissionsService.create(createSubmissionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List submissions',
    description: 'Returns all registered submissions.',
  })
  @ApiOkResponse({
    description: 'Submissions returned successfully.',
    type: SubmissionResponse,
    isArray: true,
  })
  findAll(): Promise<SubmissionResponse[]> {
    return this.submissionsService.findAll();
  }

  @Get('student/:studentId')
  @ApiOperation({
    summary: 'List submissions by student',
    description: 'Returns all submissions made by a specific student.',
  })
  @ApiParam({
    name: 'studentId',
    example: 'student-id',
    description: 'External student ID from auth-service.',
  })
  @ApiOkResponse({
    description: 'Student submissions returned successfully.',
    type: SubmissionResponse,
    isArray: true,
  })
  findByStudent(
    @Param('studentId') studentId: string,
  ): Promise<SubmissionResponse[]> {
    return this.submissionsService.findByStudent(studentId);
  }

  @Get('activity/:activityId')
  @ApiOperation({
    summary: 'List submissions by activity',
    description: 'Returns all submissions for a specific activity.',
  })
  @ApiParam({
    name: 'activityId',
    example: 'activity-id',
    description: 'Activity ID.',
  })
  @ApiOkResponse({
    description: 'Activity submissions returned successfully.',
    type: SubmissionResponse,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Activity not found.',
  })
  findByActivity(
    @Param('activityId') activityId: string,
  ): Promise<SubmissionResponse[]> {
    return this.submissionsService.findByActivity(activityId);
  }

  @Patch(':id/grade')
  @ApiOperation({
    summary: 'Register submission grade',
    description: 'Registers or updates the grade of a submission.',
  })
  @ApiParam({
    name: 'id',
    example: 'submission-id',
    description: 'Submission ID.',
  })
  @ApiOkResponse({
    description: 'Grade registered successfully.',
    type: SubmissionResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload.',
  })
  @ApiNotFoundResponse({
    description: 'Submission not found.',
  })
  updateGrade(
    @Param('id') id: string,
    @Body() updateSubmissionGradeDto: UpdateSubmissionGradeDto,
  ): Promise<SubmissionResponse> {
    return this.submissionsService.updateGrade(id, updateSubmissionGradeDto);
  }
}

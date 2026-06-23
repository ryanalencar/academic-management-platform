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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityResponse } from './responses/activity.response';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create activity',
    description: 'Creates a new academic activity linked to a class.',
  })
  @ApiCreatedResponse({
    description: 'Activity created successfully.',
    type: ActivityResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload.',
  })
  create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ActivityResponse> {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List activities',
    description: 'Returns all registered activities.',
  })
  @ApiOkResponse({
    description: 'Activities returned successfully.',
    type: ActivityResponse,
    isArray: true,
  })
  findAll(): Promise<ActivityResponse[]> {
    return this.activitiesService.findAll();
  }

  @Get('class/:classId')
  @ApiOperation({
    summary: 'List activities by class',
    description: 'Returns all activities linked to a specific class.',
  })
  @ApiParam({
    name: 'classId',
    example: 'class-001',
    description: 'External class ID from academic-service.',
  })
  @ApiOkResponse({
    description: 'Class activities returned successfully.',
    type: ActivityResponse,
    isArray: true,
  })
  findByClass(@Param('classId') classId: string): Promise<ActivityResponse[]> {
    return this.activitiesService.findByClass(classId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find activity by ID',
    description: 'Returns a single activity by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 'd7a2ad86-9d6f-4fd2-b742-40f75f84c537',
    description: 'Activity ID.',
  })
  @ApiOkResponse({
    description: 'Activity returned successfully.',
    type: ActivityResponse,
  })
  @ApiNotFoundResponse({
    description: 'Activity not found.',
  })
  findById(@Param('id') id: string): Promise<ActivityResponse> {
    return this.activitiesService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update activity',
    description: 'Updates an existing activity by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 'd7a2ad86-9d6f-4fd2-b742-40f75f84c537',
    description: 'Activity ID.',
  })
  @ApiOkResponse({
    description: 'Activity updated successfully.',
    type: ActivityResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload.',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityResponse> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete activity',
    description: 'Deletes an activity by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 'd7a2ad86-9d6f-4fd2-b742-40f75f84c537',
    description: 'Activity ID.',
  })
  @ApiNoContentResponse({
    description: 'Activity deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Activity not found.',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.activitiesService.delete(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({
    example: 'activity-id',
    description: 'Activity ID that receives the submission.',
  })
  @IsString()
  @IsNotEmpty()
  activityId!: string;

  @ApiProperty({
    example: 'student-id',
    description: 'External student ID from auth-service.',
  })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({
    example: '2026-07-10T20:30:00.000Z',
    description:
      'Submission date in ISO 8601 format. If not provided, current date will be used.',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  submittedAt?: string;
}

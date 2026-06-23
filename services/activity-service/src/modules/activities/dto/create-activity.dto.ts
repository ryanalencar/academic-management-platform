import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    example: 'Final Project',
    description: 'Activity title.',
    maxLength: 120,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @ApiProperty({
    example: 'Build and document the academic platform.',
    description: 'Activity description.',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @ApiProperty({
    example: '2026-07-10T23:59:59.000Z',
    description: 'Activity deadline in ISO 8601 format.',
  })
  @IsDateString()
  @IsNotEmpty()
  deadline!: string;

  @ApiProperty({
    example: 'class-001',
    description: 'External class ID from academic-service.',
  })
  @IsString()
  @IsNotEmpty()
  classId!: string;
}

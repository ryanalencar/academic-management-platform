import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    example: 'f18187ac-e06b-4e4d-86f5-1ec9f4d7962d',
    description: 'Student identifier from auth-service.',
  })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({
    example: '0d4bcf7b-1f79-4b84-9f8d-d9158e72f27d',
    description: 'Class identifier from academic-service.',
  })
  @IsString()
  @IsNotEmpty()
  classId!: string;
}

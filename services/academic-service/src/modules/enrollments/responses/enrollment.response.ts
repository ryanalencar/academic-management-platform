import { ApiProperty } from '@nestjs/swagger';
import { EnrollmentStatus } from 'src/generated/prisma/enums';

export class EnrollmentResponse {
  @ApiProperty({ example: '67eaa9bb-66f1-4315-a3c1-31a9c799fa9a' })
  id!: string;

  @ApiProperty({
    example: '2026-06-18T12:00:00.000Z',
    format: 'date-time',
  })
  date!: Date;

  @ApiProperty({
    enum: EnrollmentStatus,
    example: EnrollmentStatus.ACTIVE,
  })
  status!: EnrollmentStatus;

  @ApiProperty({
    example: 'f18187ac-e06b-4e4d-86f5-1ec9f4d7962d',
    description: 'Student identifier from auth-service.',
  })
  studentId!: string;

  @ApiProperty({
    example: '0d4bcf7b-1f79-4b84-9f8d-d9158e72f27d',
    description: 'Class identifier from academic-service.',
  })
  classId!: string;

  @ApiProperty({
    example: '2026-06-18T12:00:00.000Z',
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-06-18T12:00:00.000Z',
    format: 'date-time',
  })
  updatedAt!: Date;
}

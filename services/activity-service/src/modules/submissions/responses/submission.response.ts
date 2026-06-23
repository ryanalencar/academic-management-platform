import { ApiProperty } from '@nestjs/swagger';

export class SubmissionResponse {
  @ApiProperty({
    example: 'submission-id',
  })
  id!: string;

  @ApiProperty({
    example: '2026-07-10T20:30:00.000Z',
  })
  submittedAt!: Date;

  @ApiProperty({
    example: 8.5,
    nullable: true,
  })
  grade!: number | null;

  @ApiProperty({
    example: 'activity-id',
  })
  activityId!: string;

  @ApiProperty({
    example: 'student-id',
  })
  studentId!: string;

  @ApiProperty({
    example: '2026-06-23T12:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-06-23T12:00:00.000Z',
  })
  updatedAt!: Date;
}

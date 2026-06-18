import { ApiProperty } from '@nestjs/swagger';

export class ClassResponse {
  @ApiProperty({ example: '0d4bcf7b-1f79-4b84-9f8d-d9158e72f27d' })
  id!: string;

  @ApiProperty({ example: '2026.1' })
  semester!: string;

  @ApiProperty({ example: 'Mondays and Wednesdays, 19:00-21:00' })
  schedule!: string;

  @ApiProperty({
    example: '5e7015a5-f548-4859-9ea8-3d685a367c54',
    description: 'Discipline identifier from academic-service.',
  })
  disciplineId!: string;

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

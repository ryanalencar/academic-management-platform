import { ApiProperty } from '@nestjs/swagger';

export class DisciplineResponse {
  @ApiProperty({ example: '5e7015a5-f548-4859-9ea8-3d685a367c54' })
  id!: string;

  @ApiProperty({ example: 'Software Engineering' })
  name!: string;

  @ApiProperty({ example: 'CS-301' })
  code!: string;

  @ApiProperty({ example: 80 })
  workload!: number;

  @ApiProperty({
    example: '65e1fd95-0825-4f41-9fef-11b26505db92',
    description: 'Professor identifier from auth-service.',
  })
  professorId!: string;

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

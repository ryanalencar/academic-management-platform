import { ApiProperty } from '@nestjs/swagger';

export class ActivityResponse {
  @ApiProperty({
    example: 'd7a2ad86-9d6f-4fd2-b742-40f75f84c537',
  })
  id!: string;

  @ApiProperty({
    example: 'Final Project',
  })
  title!: string;

  @ApiProperty({
    example: 'Build and document the academic platform.',
  })
  description!: string;

  @ApiProperty({
    example: '2026-07-10T23:59:59.000Z',
  })
  deadline!: Date;

  @ApiProperty({
    example: 'class-001',
  })
  classId!: string;

  @ApiProperty({
    example: '2026-06-23T12:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-06-23T12:00:00.000Z',
  })
  updatedAt!: Date;
}

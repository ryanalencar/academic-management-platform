import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    example: '2026.1',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  semester!: string;

  @ApiProperty({
    example: 'Mondays and Wednesdays, 19:00-21:00',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  schedule!: string;

  @ApiProperty({
    example: '5e7015a5-f548-4859-9ea8-3d685a367c54',
    description: 'Discipline identifier from academic-service.',
  })
  @IsString()
  @IsNotEmpty()
  disciplineId!: string;
}

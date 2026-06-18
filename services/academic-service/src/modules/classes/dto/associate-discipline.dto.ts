import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssociateDisciplineDto {
  @ApiProperty({
    example: '5e7015a5-f548-4859-9ea8-3d685a367c54',
    description: 'Discipline identifier from academic-service.',
  })
  @IsString()
  @IsNotEmpty()
  disciplineId!: string;
}

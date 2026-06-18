import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssociateProfessorDto {
  @ApiProperty({
    example: '65e1fd95-0825-4f41-9fef-11b26505db92',
    description: 'Professor identifier from auth-service.',
  })
  @IsString()
  @IsNotEmpty()
  professorId!: string;
}

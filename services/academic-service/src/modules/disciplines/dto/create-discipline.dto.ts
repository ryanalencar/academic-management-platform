import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateDisciplineDto {
  @ApiProperty({
    example: 'Software Engineering',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'CS-301',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  code!: string;

  @ApiProperty({
    example: 80,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  workload!: number;

  @ApiProperty({
    example: '65e1fd95-0825-4f41-9fef-11b26505db92',
    description: 'Professor identifier from auth-service.',
  })
  @IsString()
  @IsNotEmpty()
  professorId!: string;
}

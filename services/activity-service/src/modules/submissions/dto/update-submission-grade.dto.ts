import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateSubmissionGradeDto {
  @ApiProperty({
    example: 8.5,
    description: 'Submission grade from 0 to 10.',
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  grade!: number;
}

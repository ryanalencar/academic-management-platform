import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EnrollmentStatus } from 'src/generated/prisma/enums';

export class UpdateEnrollmentStatusDto {
  @ApiProperty({
    enum: EnrollmentStatus,
    example: EnrollmentStatus.COMPLETED,
  })
  @IsEnum(EnrollmentStatus)
  status!: EnrollmentStatus;
}

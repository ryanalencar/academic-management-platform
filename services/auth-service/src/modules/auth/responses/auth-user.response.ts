import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from 'src/generated/prisma/enums';

export class AuthStudentResponse {
  @ApiProperty({ example: 'cmc0s8jvf0000q9nx2p2td2el' })
  id!: string;

  @ApiProperty({ example: '2026001234' })
  registrationNumber!: string;

  @ApiProperty({ example: 'Computer Science' })
  course!: string;
}

export class AuthProfessorResponse {
  @ApiProperty({ example: 'cmc0s8jvf0001q9nx7o5tx9aa' })
  id!: string;

  @ApiProperty({ example: 'PROF-2026-001' })
  employeeNumber!: string;

  @ApiProperty({ example: 'Computer Science' })
  department!: string;
}

export class AuthUserResponse {
  @ApiProperty({ example: 'cmc0s8jvf0002q9nx9ppxk4cl' })
  id!: string;

  @ApiProperty({ example: 'Ana Souza' })
  name!: string;

  @ApiProperty({ example: 'ana.souza@example.com' })
  email!: string;

  @ApiProperty({ enum: UserType, example: UserType.STUDENT })
  type!: UserType;

  @ApiProperty({
    example: '2026-06-17T15:20:00.000Z',
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    type: AuthStudentResponse,
    nullable: true,
  })
  student?: AuthStudentResponse | null;

  @ApiPropertyOptional({
    type: AuthProfessorResponse,
    nullable: true,
  })
  professor?: AuthProfessorResponse | null;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterProfessorDto {
  @ApiProperty({
    example: 'Dr. Marcos Lima',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'marcos.lima@example.com',
    maxLength: 150,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email!: string;

  @ApiProperty({
    example: 'StrongPass123',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @ApiProperty({
    example: 'PROF-2026-001',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  employeeNumber!: string;

  @ApiProperty({
    example: 'Computer Science',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  department!: string;
}

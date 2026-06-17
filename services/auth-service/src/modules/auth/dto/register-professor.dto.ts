import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterProfessorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  employeeNumber!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  department!: string;
}

import { UserType } from './user-type.enum';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly type: UserType;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.type = props.type;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public isStudent(): boolean {
    return this.type === UserType.STUDENT;
  }

  public isProfessor(): boolean {
    return this.type === UserType.PROFESSOR;
  }

  public isAdmin(): boolean {
    return this.type === UserType.ADMIN;
  }
}

import { User, UserProps } from './user.entity';
import { UserType } from './user-type.enum';

export type ProfessorProps = Omit<UserProps, 'type'> & {
  employeeNumber: string;
  department: string;
};

export class Professor extends User {
  public readonly employeeNumber: string;
  public readonly department: string;

  constructor(props: ProfessorProps) {
    super({
      ...props,
      type: UserType.PROFESSOR,
    });

    this.employeeNumber = props.employeeNumber;
    this.department = props.department;
  }
}

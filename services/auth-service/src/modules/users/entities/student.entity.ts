import { User, UserProps } from './user.entity';
import { UserType } from './user-type.enum';

export type StudentProps = Omit<UserProps, 'type'> & {
  registrationNumber: string;
  course: string;
};

export class Student extends User {
  public readonly registrationNumber: string;
  public readonly course: string;

  constructor(props: StudentProps) {
    super({
      ...props,
      type: UserType.STUDENT,
    });

    this.registrationNumber = props.registrationNumber;
    this.course = props.course;
  }
}

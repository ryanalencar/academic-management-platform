import { EnrollmentStatus } from './enrollment-status.enum';

export type EnrollmentProps = {
  id?: string;
  date?: Date;
  status?: EnrollmentStatus;
  studentId: string;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Enrollment {
  public readonly id?: string;
  public readonly date: Date;
  public readonly status: EnrollmentStatus;
  public readonly studentId: string;
  public readonly classId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: EnrollmentProps) {
    this.id = props.id;
    this.date = props.date ?? new Date();
    this.status = props.status ?? EnrollmentStatus.ACTIVE;
    this.studentId = props.studentId;
    this.classId = props.classId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

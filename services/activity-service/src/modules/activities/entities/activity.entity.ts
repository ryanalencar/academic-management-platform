export type ActivityProps = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Activity {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly deadline: Date;
  public readonly classId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: ActivityProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.deadline = props.deadline;
    this.classId = props.classId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public isExpired(referenceDate: Date = new Date()): boolean {
    return this.deadline.getTime() < referenceDate.getTime();
  }
}

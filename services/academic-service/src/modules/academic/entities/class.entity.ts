export type ClassProps = {
  id?: string;
  semester: string;
  schedule: string;
  disciplineId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Class {
  public readonly id?: string;
  public readonly semester: string;
  public readonly schedule: string;
  public readonly disciplineId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: ClassProps) {
    this.id = props.id;
    this.semester = props.semester;
    this.schedule = props.schedule;
    this.disciplineId = props.disciplineId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

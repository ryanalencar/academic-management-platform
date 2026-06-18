export type DisciplineProps = {
  id?: string;
  name: string;
  code: string;
  workload: number;
  professorId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Discipline {
  public readonly id?: string;
  public readonly name: string;
  public readonly code: string;
  public readonly workload: number;
  public readonly professorId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: DisciplineProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code;
    this.workload = props.workload;
    this.professorId = props.professorId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

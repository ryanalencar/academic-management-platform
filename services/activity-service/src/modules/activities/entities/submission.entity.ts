export type SubmissionProps = {
  id: string;
  submittedAt: Date;
  grade?: number | null;
  activityId: string;
  studentId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Submission {
  public readonly id: string;
  public readonly submittedAt: Date;
  public readonly grade?: number | null;
  public readonly activityId: string;
  public readonly studentId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: SubmissionProps) {
    this.id = props.id;
    this.submittedAt = props.submittedAt;
    this.grade = props.grade;
    this.activityId = props.activityId;
    this.studentId = props.studentId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public hasGrade(): boolean {
    return this.grade !== null && this.grade !== undefined;
  }

  public isApproved(minimumGrade = 7): boolean {
    if (!this.hasGrade()) {
      return false;
    }

    return Number(this.grade) >= minimumGrade;
  }
}

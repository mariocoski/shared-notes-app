import { Entity, UniqueEntityID } from '../../../shared/domain/Entity';

export interface NoteProps {
  title: string;
  body: string;
  createdByUserId: number;
  createdAt?: string;
  updatedAt?: string;
  sharedWithUserIds?: number[];
}

export class Note extends Entity<NoteProps> {
  private markedAsDeleted = false;

  get createdAt(): string | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): string | undefined {
    return this.props.updatedAt;
  }

  get title(): string {
    return this.props.title;
  }

  get body(): string {
    return this.props.body;
  }

  get createdByUserId(): number {
    return this.props.createdByUserId;
  }

  get sharedWithUserIds(): number[] {
    return this.props.sharedWithUserIds || [];
  }

  public delete() {
    this.markedAsDeleted = true;
  }

  public isDeleted() {
    return this.markedAsDeleted;
  }

  public shareWithUsers(userIds: number[]) {
    this.props.sharedWithUserIds = this.props.sharedWithUserIds || [];

    const uniqUserIds = Array.from(
      new Set([...this.props.sharedWithUserIds, ...userIds])
    );

    const filteredUserIds = uniqUserIds.filter(userId => userId !== this.props.createdByUserId);

    this.props.sharedWithUserIds = filteredUserIds;
  }

  private constructor(props: NoteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: NoteProps, id?: UniqueEntityID): Note {
    // Business rules
    return new Note(props, id);
  }
}

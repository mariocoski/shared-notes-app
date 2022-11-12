import {
  Column,
  Entity,
  CreateDateColumn,
  JoinTable,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Note } from './Note';
import { User } from './User';

@Entity('users_notes')
export class UserNote {
  @Column({ type: 'int', nullable: false, generated: 'increment' })
  id: number;

  @PrimaryColumn({ type: 'int' })
  user_id: number;

  @PrimaryColumn({ type: 'int' })
  note_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @OneToOne(() => User)
  @JoinTable()
  user: User;

  @OneToOne(() => Note)
  @JoinTable()
  note: Note;
}

export default UserNote;

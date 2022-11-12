import { UniqueEntityID } from '../../../../../../shared/domain/Entity';
import { Note as NoteDBO } from '../../../../../../database/entities/Note';
import { Note } from '../../../Note';

interface UserNoteDBO {
  id: number;
  user_id: number;
  note_id: number;
  created_at: string;
}

export interface EnhancedNoteDBO {
  id: number;
  title: string;
  body: string;
  created_by_user_id: number;
  created_at: number;
  updated_at: number;
  users_notes: UserNoteDBO[];
}

export const mapNoteDBOtoDomain = (noteDBO: EnhancedNoteDBO): Note => {
  const sharedWithUserIds = (noteDBO.users_notes || []).map(
    (userNoteDBO) => userNoteDBO.user_id
  );

  return Note.create(
    {
      title: noteDBO.title,
      body: noteDBO.body,
      createdByUserId: noteDBO.created_by_user_id,
      sharedWithUserIds,
      createdAt: new Date(noteDBO.created_at).toISOString(),
      updatedAt: new Date(noteDBO.updated_at).toISOString(),
    },
    new UniqueEntityID(noteDBO.id)
  );
};

export const mapNoteDomainToDBO = async (
  noteDomain: Note
): Promise<Partial<NoteDBO>> => {
  return {
    title: noteDomain.title,
    body: noteDomain.body,
    created_by_user_id: noteDomain.createdByUserId,
  };
};

import { NOT_SET } from '../../../../../../shared/constants';
import connectionSource from '../../../../../../database/config/typeorm_config';
import { Note as NoteModel } from '../../../../../../database/entities/Note';
import { UserNote as UserNoteModel } from '../../../../../../database/entities/UserNote';
import { Note } from '../../../Note';
import { NoteRepositoryInterface } from '../../NoteRepositoryInterface';
import { mapNoteDBOtoDomain, mapNoteDomainToDBO } from './mappers';

export const createTypeormNoteRepository = (): NoteRepositoryInterface => {
  return {
    getAllByUserId: async (userId: number) => {
      const data = await connectionSource.createEntityManager().query(
        `select
        n.*,
         COALESCE(json_agg(un.*) FILTER (where un.id IS NOT NULL), '[]'::JSON) as users_notes 
    from
        notes n
        left join users_notes un
            on un.note_id = n.id 
        where ((n.created_by_user_id=$1) or (un.user_id=$1 AND un.note_id = n.id))
        AND n.deleted_at is null
        group by n.id
        order by n.created_at desc
  `,
        [userId]
      );

      return data.map(mapNoteDBOtoDomain);
    },
    getNoteIdAndUserId: async (noteId: number, userId: number) => {
      const [noteDBO] = await connectionSource.createEntityManager().query(
        `select
         n.*,
         COALESCE(json_agg(un.*) FILTER (where un.id IS NOT NULL), '[]'::JSON) as users_notes 
        from
        notes n
        left join users_notes un
            on un.note_id = n.id 
        where n.id=$1 and ((n.created_by_user_id=$2) or (un.user_id=$2 AND un.note_id = n.id))
        AND n.deleted_at is null
        group by n.id
        limit 1
  `,
        [noteId, userId]
      );

      if (!noteDBO) {
        throw new Error('Note not found');
      }

      return mapNoteDBOtoDomain(noteDBO);
    },
    save: async (note: Note) => {
      const shouldInsertANote = note.id.toString() === NOT_SET;
      const noteDBO = await mapNoteDomainToDBO(note);
      let noteID: number;

      const exists = note.id.toString() !== NOT_SET;

      if (exists && note.isDeleted()) {
        await connectionSource
          .getRepository(NoteModel)
          .softDelete({ id: Number(note.id.toString()) });
        return Number(note.id.toString());
      }

      if (shouldInsertANote) {
        const response = await connectionSource
          .getRepository(NoteModel)
          .insert(noteDBO);

        noteID =
          Array.isArray(response?.identifiers) &&
          response.identifiers.length > 0 &&
          response.identifiers[0]?.id
            ? response.identifiers[0]?.id
            : undefined;
      } else {
        noteID = Number(note.id.toString());
        await connectionSource
          .getRepository(NoteModel)
          .update({ id: noteID }, noteDBO);
      }

      const userNotes = note.sharedWithUserIds.map((userId) => ({
        user_id: userId,
        note_id: noteID,
      }));

      await connectionSource
        .createQueryBuilder()
        .insert()
        .into(UserNoteModel)
        .values(userNotes)
        .orIgnore()
        .execute();

      return noteID;
    },
  };
};

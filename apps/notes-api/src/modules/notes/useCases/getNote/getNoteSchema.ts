import * as yup from 'yup';

export const getNoteSchema = yup.object({
  noteId: yup.number().defined().required(), 
});

export type GetNoteSchema = yup.InferType<typeof getNoteSchema>;

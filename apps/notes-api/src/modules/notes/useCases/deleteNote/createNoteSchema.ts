import * as yup from 'yup';

export const deleteNoteSchema = yup.object({
  noteId: yup.number().defined().required(), 
});

export type DeleteNoteSchema = yup.InferType<typeof deleteNoteSchema>;

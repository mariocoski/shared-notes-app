import * as yup from 'yup';

export const createNoteSchema = yup.object({
  title: yup.string().defined().required(),
  body: yup.string().defined().required(),
});

export type CreateNoteSchema = yup.InferType<typeof createNoteSchema>;

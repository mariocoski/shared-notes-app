import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().defined().required().max(255),
  password: yup.string().defined().required().max(255),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

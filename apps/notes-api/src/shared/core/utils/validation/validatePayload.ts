interface YupLike<T> {
  validateSync: (payload: unknown) => T;
}

export const validatePayload = async <T>(
  payload: unknown,
  schema: YupLike<T>
) => {
  const validated: T = schema.validateSync(payload);

  return validated;
};

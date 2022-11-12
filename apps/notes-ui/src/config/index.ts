const getConfigValue = (variable: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return process.env[variable] || (window as any)[variable];
};

export const config = {
  apiHost: getConfigValue('NX_API_URL'),
};

export default config;

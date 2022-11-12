const config = {
  jwtExpiresIn: process.env.JWT_EXPIRES_IN_MS || 86400000, // 24hrs
  jwtAlgo: process.env.JWT_ALGO || 'HS256',
  postgresConnectionString: process.env.POSTGRES_CONNECTION_URI,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.ENV,
};

export default config;

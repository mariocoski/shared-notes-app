import * as express from 'express';
import * as cors from 'cors';
import { createDbConnection } from './shared/core/utils/createDbConnection';
import { API_BASE_URL } from './constants';
import { createApplication } from './shared/infrastructure/http/createApplication';
import config from './config';

export const init = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  const presenter: express.Router = createApplication();

  app.use(API_BASE_URL, presenter);

  app.use('*', (req, res, _next) => {
    console.log('Not found route', req.path);
    return res.status(404).send({ message: 'Not found' });
  });

  app.use((error, _req, res, _next) => {
    console.log('error', error);

    const isLocalDevelopment = config.environment === 'local';

    return res.status(500).send({
      message: isLocalDevelopment ? error?.message : 'Internal server error',
      stackTrace: isLocalDevelopment ? error?.stack : undefined,
    });
  });

  process.on('unhandledRejection', (reason) => {
    console.error('reason', reason);
  });

  return app;
};

const runApp = async () => {
  await createDbConnection();
  const app = await init();

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  server.on('error', console.error);
};

runApp();

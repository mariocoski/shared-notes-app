import { createAuthRouter } from '../../../modules/users/infrastructure/router';
import * as express from 'express';
import { createNotesRouter } from '../../../modules/notes/infrastructure/router';
import { authenticate } from './authenticate';

const NOTES = '/notes';
const AUTH = '/auth';

export const createApplication = () => {
  const router = express.Router();

  router.use(NOTES, authenticate, createNotesRouter());
  router.use(AUTH, createAuthRouter());

  return router;
};

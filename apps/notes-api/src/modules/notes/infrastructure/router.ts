import * as express from 'express';
import { createNoteController } from '../useCases/createNote/index';
import { deleteNoteController } from '../useCases/deleteNote/index';
import { getNoteController } from '../useCases/getNote';
import { getNotesController } from '../useCases/getNotes';
import { shareNoteController } from '../useCases/shareNote';

export const createNotesRouter = () => {
  const router = express.Router();

  router.post('/', createNoteController);
  router.get('/', getNotesController);
  router.delete('/:noteId', deleteNoteController);
  router.get('/:noteId', getNoteController);
  router.post('/:noteId/share', shareNoteController);

  return router;
};

import { createUsersTable1634071066694 } from './1634071066691-create_users_table';
import { createNotesTable1634071094510 } from './1634071066694-create_notes_table';
import { createUsersNotesTable1634071118858 } from './1634071118858-create_users_notes_table';
import { initialDbSeed1634071953686 } from './1634071953686-initial_db_seed';

const migrations = [
  createUsersTable1634071066694,
  createNotesTable1634071094510,
  createUsersNotesTable1634071118858,
  initialDbSeed1634071953686,
];

module.exports = migrations;

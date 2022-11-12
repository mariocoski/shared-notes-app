import { Connection, createConnection } from 'typeorm';
import connectionSource from '../../../database/config/typeorm_config';
import connectionConfig from '../../../database/config/typeorm_config';

export interface DbConnection {
  db: Connection;
}
let db;

export const createDbConnection = async (): Promise<void> => {
  await connectionSource.initialize();
};

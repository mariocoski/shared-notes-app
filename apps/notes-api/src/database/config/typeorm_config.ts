import config from '../../config';
import * as entities from '../entities';
import * as migrations from '../migrations';
import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:postgrespassword@localhost:5432/postgres', // config.postgresConnectionString,
  entities: entities,
  migrations: migrations,
  synchronize: false,
  logging: false,
});

export default connectionSource;

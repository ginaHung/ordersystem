import { ConnectionOptions, Connection } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `./.${process.env.NODE_ENV}-env`});

const resolveFilePath = (folderName: string): string => {
  return `${folderName}/*.ts`;
};
const dbconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  migrationsRun: false,
  synchronize: false,
  logging: true,
  maxQueryExecutionTime: 5000,
  entities: [
    resolveFilePath('entity'),
  ],
  subscribers: [
    resolveFilePath('subscriber'),
  ],
  migrations: [
    resolveFilePath('migration'),
  ],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
  },
};

export default dbconfig;

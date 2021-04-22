import { ConnectionOptions } from 'typeorm';

const resolveFilePath = (folderName: string): string => {
  return process.env.NODE_ENV === 'production' ? `out/${folderName}/*.js` : `src/${folderName}/*.ts`;
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
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export default dbconfig;

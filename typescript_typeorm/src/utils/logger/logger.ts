
import { configure, getLogger, connectLogger } from 'log4js';

configure({
  appenders: {
    out: {
      type: 'stdout',
    },
    project_file_log: {
      type: 'file',
      filename: 'logs/project_out.log',
      maxLogSize: 10485760,
      backups: 7,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['out', 'project_file_log'],
      level: 'info',
    },
  },
  disableClustering: true,
});

export default getLogger();

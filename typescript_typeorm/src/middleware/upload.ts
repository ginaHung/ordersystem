import { S3 } from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

const s3 = new S3({
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  endpoint: process.env.MINIO_HOST,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

const uploadMiddleware = multer({
  storage: multerS3({
    s3,
    bucket: 'hyman',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default uploadMiddleware;

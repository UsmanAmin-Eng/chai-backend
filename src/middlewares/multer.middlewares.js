import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const uploadDirectory = path.join(os.tmpdir(), 'my-uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(uploadDirectory, { recursive: true }, (error) => {
      if (error) return cb(error);
      cb(null, uploadDirectory);
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    cb(null, `${uniqueSuffix}-${path.basename(file.originalname)}`);
  },
});

export const upload = multer({ storage });
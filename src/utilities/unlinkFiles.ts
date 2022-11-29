import * as fs from 'fs';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';

export const unlinkFiles = (filename: string) => {
  fs.unlink(
    path.resolve(path.join(__dirname, '..', '..', 'uploads', filename)),
    (err) => {
      if (err) throw new NotFoundException(err.toString());
    },
  );
};

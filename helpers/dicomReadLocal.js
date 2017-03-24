import fs from 'fs';
import dicomReadRaw from './dicomReadRaw';

export default (directory, file, callback) => {
  const fullPath = `${directory}/${file}`;

  // console.log('reading local file', fullPath);

  fs.readFile(fullPath, (err, data) => {
    if (data) {
      const tags = dicomReadRaw(data);
      callback(undefined, {
        ...tags,
        directory,
        file,
      });
    }
  });
};

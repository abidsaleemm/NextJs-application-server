import walk from 'walk';
import dicomReadLocal from './dicomReadLocal';

export default (path, callback) => {
  const walker = walk.walk(path);
  walker.on('file', (root, fileStats, next) => {
    if (fileStats.isFile()) {
      dicomReadLocal(root, fileStats.name, callback);
      next();
    }
  });
};

import dicomReadLocal from './dicomReadLocal';
import dicomReadAzure from './dicomReadAzure';

export default (directory, file, callback) => {
  if (process.env.NODE_ENV === 'local') {
    dicomReadLocal(directory, file, callback);
  } else {
    dicomReadAzure(directory, file, callback);
  }
};

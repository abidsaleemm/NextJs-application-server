import azure from 'azure-storage';
import dicomReadRaw from './dicomReadRaw';

// issue-1
// TODO Might have to handle this under each function
const fileService = azure.createFileService(
  'multus',
  'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==',
  'https://multus.file.core.windows.net');

export default (directory, file, callback) => {
  let stream;
  try {
    stream = fileService.createReadStream(
      'dicom',
      directory,
      file,
    );
  } catch(e) {
    console.log('error', e);
  }

  const buffers = [];
  stream.on('data', (buffer) => {
    buffers.push(buffer);
  });

  stream.on('end', () => {
    const buffer = Buffer.concat(buffers);
    const tags = dicomReadRaw(buffer);
    callback(undefined, { ...tags, directory, file });
  });

  stream.on('error', ({ name, message, statusCode }) => {
    console.log('error', name, message, statusCode);
  });
};

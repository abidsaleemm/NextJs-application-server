import azure from 'azure-storage';
import dicomReadImage from './dicomReadImage';

const fileService = azure.createFileService(
  'multus',
  'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==',
  'https://multus.file.core.windows.net');

export const readFile = (directory, file, callback) => {
  const stream = fileService.createReadStream(
    'dicom',
    directory,
    file,
  );

  console.log('readfile', directory, file);

  const buffers = [];
  stream.on('data', (buffer) => {
    buffers.push(buffer);
  });
  stream.on('end', () => {
    const buffer = Buffer.concat(buffers);
    const tags = dicomReadImage(buffer);
    callback(undefined, { ...tags, directory, file });
  });
};

const directoryListing = (directory, callback) => {
  console.log('list', directory)
  fileService.listFilesAndDirectoriesSegmented(
    'dicom',
    directory,
    null,
    (error, result) => {
      if (result) {
        const {
          entries: {
            files = [],
            directories = [],
          } = {},
        } = result;

        files.forEach(({ name }) => {
          readFile(directory, name, callback);
        });

        directories.forEach(({ name }) => {
          directoryListing(`${directory}/${name}`, callback);
        });
      }
    }
  );
}

export default (callback) => {
  directoryListing('', callback);
}

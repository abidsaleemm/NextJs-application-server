import azure from 'azure-storage';
import dicomReadAzure from './dicomReadAzure';

// issue-1
// TODO Might have to handle this under each function
const fileService = azure.createFileService(
  'multus',
  'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==',
  'https://multus.file.core.windows.net');

// TODO Clean up this recursion
const directoryListing = (directory, callback) => {
  console.log('list', directory)
  try {
    fileService.listFilesAndDirectoriesSegmented(
      'dicom',
      directory,
      null,
      (error, result) => {
        if (error) {
          console.log('error', error)
        }

        if (result) {
          const {
            entries: {
              files = [],
              directories = [],
            } = {},
          } = result;

          files.forEach(({ name }) => {
            dicomReadAzure(directory, name, callback);
          });

          directories.forEach(({ name }) => {
            directoryListing(`${directory}/${name}`, callback);
          });
        }
      }
    );
  } catch(e) {
    console.log('error', e);
  }
}

// TODO Clean up this recursion
export default (callback) => {
  directoryListing('', callback);
}

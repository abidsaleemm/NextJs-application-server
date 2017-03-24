import dicomScanLocal from './dicomScanLocal';
import dicomScanAzure from './dicomScanAzure';

export default (callback) => {
  if (process.env.NODE_ENV === 'local') {
    const dicomDirectory = '../dicom-sample-data/Spinal';
    dicomScanLocal(dicomDirectory, callback);
  } else {
    dicomScanAzure(callback);
  }
}

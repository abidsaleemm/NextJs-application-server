import fs from 'fs';
import walk from 'walk';
import dicomParser from 'dicom-parser';

export function parseImagePosition(value = '') {
  const arrSplit = value.split('\\');
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1]),
    z: parseFloat(arrSplit[2]),
  };
}

export function parseImageOrientation(value = '') {
  const arrSplit = value.split('\\');
  return [
    {
      x: parseFloat(arrSplit[0]),
      y: parseFloat(arrSplit[1]),
      z: parseFloat(arrSplit[2]),
    },
    {
      x: parseFloat(arrSplit[3]),
      y: parseFloat(arrSplit[4]),
      z: parseFloat(arrSplit[5]),
    }
  ];
}

export function parsePixelSpacing(value = '') {
  const arrSplit = value.split('\\');
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1]),
  };
}

// TODO build a loader for samba2 or REST file service Azure
export default (path, callback) => {
  const walker = walk.walk(path);
  walker.on('file', (root, fileStats, next) => {
    if (fileStats.isFile()) {
      const fullPath = `${root}/${fileStats.name}`;
      fs.readFile(fullPath, (err, data) => {
        if (data) {
          try {
            const dataSet = dicomParser.parseDicom(data);

            const tags = {
              patientName: dataSet.string('x00100010'),
              patientID: dataSet.string('x00100020'),
              imageNumber: parseInt(dataSet.string('x00200013'), 10),
              studyID: dataSet.string('x00200010'),
              studyName: dataSet.string('x00081030'),
              studyDate: dataSet.string('x00080020'),
              studyUID: dataSet.string('x0020000d'),
              rows: dataSet.uint16('x00280010'),
              columns: dataSet.uint16('x00280011'),
              seriesName: dataSet.string('x0008103e'),
              seriesUID: dataSet.string('x0020000e'),
              classUID: dataSet.string('x00080016'),
              bitsAllocated: dataSet.uint16('x00280100'),
              bitsStored: dataSet.uint16('x00280101'),
              highBit: dataSet.uint16('x00280102'),
              windowCenter: parseInt(dataSet.string('x00281050'), 10),
              windowWidth: parseInt(dataSet.string('x00281051'), 10),
              imagePosition: parseImagePosition(
                dataSet.string('x00200032')),
              imageOrientation: parseImageOrientation(
                dataSet.string('x00200037')),
              imageLocation: parseFloat(dataSet.string('x00201041'), 10),
              pixelSpacing: parsePixelSpacing(dataSet.string('x00280030')),
              pixelAspectRatio: parsePixelSpacing(dataSet.string('x00280034')),
              instanceUID: dataSet.string('x00080018'),
              sliceThickness: parseFloat(dataSet.string('x00180050')),
              photometricInterpretation: dataSet.string('x00280004'),
              modality: dataSet.string('x00080060'),
            };

            // const pixelDataElement = dataSet.elements.x7fe00010;
            // const pixelData = [];
            // if (pixelDataElement) {
            //   const dataPixels = new Uint8Array(
            //     data.slice(pixelDataElement.dataOffset),
            //     pixelDataElement.length
            //   );
            //
            //   // convert to standard array
            //   const { rows, columns } = tags;
            //   const size = rows * columns;
            //
            //   for (let i = 0, i2 = 0; i < size; i += 1, i2 += 2) {
            //     pixelData.push(
            //       (dataPixels[i2]) + (dataPixels[i2 + 1] * 256)
            //     );
            //   }
            // }

            callback(undefined, { ...tags, fullPath });
          } catch (e) {
            callback(e, undefined);
          }
        }
        next();
      });
    }
  });
};

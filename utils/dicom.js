import fs from 'fs';
import walk from 'walk';
import dicomParser from 'dicom-parser';

export function dicomScandirectory(path, callback) {
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
              instanceUID: dataSet.string('x00080018'),
              bitsAllocated: dataSet.uint16('x00280100'),
              bitsStored: dataSet.uint16('x00280101'),
              highBit: dataSet.uint16('x00280102'),
              windowCenter: parseInt(dataSet.string('x00281050'), 10),
              windowWidth: parseInt(dataSet.string('x00281051'), 10),
              imagePosition: parseImagePosition(
                dataSet.string('x00200032')),
              imageOrientation: parseImageOrientation(
                dataSet.string('x00200037')),
              pixelSpacing: parsePixelSpacing(dataSet.string('x00280030')),
              pixelAspectRatio: parsePixelSpacing(dataSet.string('x00280034')),
              sliceThickness: parseFloat(dataSet.string('x00180050')),
              photometricInterpretation: dataSet.string('x00280004'),
              modality: dataSet.string('x00080060'),
            };

            // const pixelDataElement = dataSet.elements.x7fe00010;
            // let pixelData = null;
            //
            // if (pixelDataElement) {
            //   // pixelData = new TextDecoder('utf-16le').
            //   //   decode(new Uint16Array(
            //   //     data,
            //   //     pixelDataElement.dataOffset,
            //   //     pixelDataElement.length
            //   //   )
            //   // );
            //
            //   // pixelData = String.fromCharCode(
            //   //   // null,
            //   //   new Uint16Array(
            //   //     data,
            //   //     pixelDataElement.dataOffset,
            //   //     pixelDataElement.length
            //   //   )
            //   // );
            //
            //   pixelData = new Uint16Array(
            //     data,
            //     pixelDataElement.dataOffset,
            //     pixelDataElement.length
            //   );
            //   // console.log(pixelData);
            // }

            callback(undefined, tags, fullPath);
          } catch (e) {
            //  console.log('Error', e)
            callback(e, undefined);
          }
        }
        next();
      });
    }
  });
}

// TODO will need to handle frames at some point
function dicomReadImageData(path) {
  const data = fs.readFileSync(path);

  if (data) {
    try {
      const dataSet = dicomParser.parseDicom(data);

      const tags = {
        rows: dataSet.uint16('x00280010'),
        columns: dataSet.uint16('x00280011'),
        bitsAllocated: dataSet.uint16('x00280100'),
        bitsStored: dataSet.uint16('x00280101'),
        highBit: dataSet.uint16('x00280102'),
        windowCenter: parseInt(dataSet.string('x00281050'), 10),
        windowWidth: parseInt(dataSet.string('x00281051'), 10),
        pixelSpacing: parsePixelSpacing(dataSet.string('x00280030')),
        pixelAspectRatio: parsePixelSpacing(dataSet.string('x00280034')),
      };

      const pixelDataElement = dataSet.elements.x7fe00010;
      // let pixelData = null;

      // console.log(pixelDataElement.length)
      if (pixelDataElement) {
        // const pixelData = new
        let pixelData = new Uint8Array(
          data.slice(pixelDataElement.dataOffset),
          pixelDataElement.length
        );

        // pixelData = Uint16Array.from()
        // console.log(pixelDataElement.length, pixelData.length)

      //   console.log(
      //     pixelData.length,
      //     pixelDataElement.dataOffset,
      //     pixelDataElement.length,
      //  )

        return { tags, pixelData };
        // callback(undefined, tags, pixelData);
      }

      return { tags };
    } catch(e) {
      // console.log('Error: ', e);
      return {};
    }
  }
}

export function createJpgFromDicom(path) {
  const { tags, pixelData }
    = dicomReadImageData(path);

  if (tags && pixelData) {
    // TODO handle different encodings
    const {
      rows,
      columns,
      windowCenter,
      windowWidth,
      // bitsStored // usualy 16 bit but add other formats in
    } = tags;
    // const size = pixelData.length;
    const size = rows * columns * 4;

    const canvas = document.createElement('canvas')
    canvas.width = columns;
    canvas.height = rows;

    // console.log(size, columns, rows)
    const imageArray = new Uint8ClampedArray(size);

    const low = windowCenter - windowWidth / 2;
    const high = windowCenter + windowWidth / 2
    // Convert to 8bit pixel
    for (let i = 0, i2 = 0; i < size; i2+=2) {
      const value = (pixelData[i2]) + (pixelData[i2+1]*256);

      let pixelValue = 0;
      if (value <= low) {
        pixelValue = 0;
      } else if (value > high) {
        pixelValue = 0;
      } else {
        pixelValue =
          (((value - (windowCenter - 0.5)) / (windowWidth - 1)) + 0.5) * 255;
      }

      imageArray[i++] = pixelValue;
      imageArray[i++] = pixelValue;
      imageArray[i++] = pixelValue;
      imageArray[i++] = 256;
    }

    const imageData = new ImageData(
      imageArray,
      columns,
      rows
    );

    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");

    // console.log(dataUrl);

    //  for (let y = 0; y < rows; y++) {
    //    for (let x = 0; x < columns; x++) {
    //
    //    }
    //  }
    return dataUrl;
  }
}

function parseDate(value) {

}

function parseImagePosition(value = '') {
  const arrSplit = value.split('\\');
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1]),
    z: parseFloat(arrSplit[2]),
  }
}

function parseImageOrientation(value = '') {
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

function parsePixelSpacing(value = '') {
  const arrSplit = value.split('\\');
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1]),
  }
}

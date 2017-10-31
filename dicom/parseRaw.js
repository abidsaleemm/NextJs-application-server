import dicomParser from "dicom-parser/build/built";
// issue-73
import { Series, Utils } from "daikon";

export default (data, { bypassData = false, path } = {}) => {
  try {
    const dataSet = dicomParser.parseDicom(data);
    const tags = {
      rows: dataSet.uint16("x00280010"),
      columns: dataSet.uint16("x00280011"),
      imageNumber: parseInt(dataSet.string("x00200013"), 10),
      windowCenter: parseInt(dataSet.string("x00281050"), 10),
      windowWidth: parseInt(dataSet.string("x00281051"), 10),
      pixelSpacing: parsePixelSpacing(dataSet.string("x00280030")),
      pixelAspectRatio: parsePixelSpacing(
        dataSet.string("x00280034")
      ),
      instanceUID: dataSet.string("x00080018"),
      sliceThickness: parseFloat(dataSet.string("x00180050")),
      imagePosition: parseImagePosition(dataSet.string("x00200032")),
      imageOrientation: parseImageOrientation(
        dataSet.string("x00200037")
      ),
      imageLocation: parseFloat(dataSet.string("x00201041"), 10),
      seriesUID: dataSet.string("x0020000e"),
      seriesName: dataSet.string("x0008103e"),
      studyUID: dataSet.string("x0020000d"),
      modality: dataSet.string("x00080060"),
      studyName: dataSet.string("x00081030"),
      studyDate: dataSet.string("x00080020"),
      patientName: dataSet.string("x00100010"),
      patientID: dataSet.string("x00100020"),
      patientBirthDate: dataSet.string("x00100030"),
      // Pixel data tags
      bitsAllocated: dataSet.uint16("x00280100"),
      bitsStored: dataSet.uint16("x00280101"),
      highBit: dataSet.uint16("x00280102")
    };

    const pixelDataElement = dataSet.elements.x7fe00010;

    if (pixelDataElement !== undefined && bypassData === false) {
      const image = Series.parseImage(
        new DataView(Utils.toArrayBuffer(data))
      );

      const size =
        image.getRows() *
        image.getCols() *
        image.getNumberOfFrames() *
        (image.getBitsAllocated() / 8);
      const imageData = new Int16Array(image.getPixelDataBytes());
      const pixelData = new Array(size)
        .fill(0)
        .map((v, i) => imageData[i]);

      return { ...tags, pixelData };
    }

    return { ...tags };
  } catch (e) {
    // console.log('parseDicom error', e)
    return {};
  }
};

const parseImagePosition = (value = "") => {
  const arrSplit = value.split("\\");
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1]),
    z: parseFloat(arrSplit[2])
  };
};

const parseImageOrientation = (value = "") => {
  const arrSplit = value.split("\\");
  return [
    {
      x: parseFloat(arrSplit[0]),
      y: parseFloat(arrSplit[1]),
      z: parseFloat(arrSplit[2])
    },
    {
      x: parseFloat(arrSplit[3]),
      y: parseFloat(arrSplit[4]),
      z: parseFloat(arrSplit[5])
    }
  ];
};

const parsePixelSpacing = (value = "") => {
  const arrSplit = value.split("\\");
  return {
    x: parseFloat(arrSplit[0]),
    y: parseFloat(arrSplit[1])
  };
};

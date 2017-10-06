import fs from 'fs';

const savePath = 'projectsLocal/video';

export const videoSave = async ({ studyUID, readStream }) => {
    if (fs.existsSync(savePath) === false) {
        fs.mkdirSync(savePath);
    }

    const writeStream = fs.createWriteStream(`${savePath}/${studyUID}.mp4`);
    readStream.pipe(writeStream);
};

export const videoLoad = ({ studyUID }) => {
    return fs.createReadStream(`${savePath}/${studyUID}.mp4`);
};

export const videoExists = ({ studyUID }) => {
    return fs.existsSync(`${savePath}/${studyUID}.mp4`);
};

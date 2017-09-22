import fs from 'fs';

const savePath = 'projectsLocal/video';

export const saveVideo = async ({ studyUID, readStream }) => {
    if (fs.existsSync(savePath) === false) {
        fs.mkdirSync(savePath);
    }

    const writeStream = fs.createWriteStream(`${savePath}/${studyUID}.mp4`);
    readStream.pipe(writeStream);
};

export const loadVideo = ({ studyUID }) => {
    return fs.createReadStream(`${savePath}/${studyUID}.mp4`);
};

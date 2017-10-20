import walk from 'walk';
import fs from 'fs';
import parseRaw from '../parseRaw';

export let series = {};
export let studies = {};
export let images = {};
export const path = process.env.LOCAL_PATH || '../backup/test'; // TODO Make this an env var or arg. Modify this to point to your local DICOM files

// Export API calls
export { default as getStudies } from './getStudies';
export { default as getStudy } from './getStudy';
export { default as getSeries } from './getSeries';
export { default as getImages } from './getImages';

// Self Invoking function used for testing locally
((directory = path) =>
    new Promise((resolve, reject) => {
        const walker = walk.walk(directory, {});

        walker.on("file", (root, { name }, next) => {
            const fullPath = `${root}/${name}`;

            fs.readFile(fullPath, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }

                // Override here
                let newPath = fullPath.replace(path, '');
                newPath = newPath.indexOf('/') === 0 ? newPath.substring(1): location;

                const location = newPath.substring(0, newPath.indexOf("/"));

                const {
                    studyUID,
                    studyName,
                    studyDate,
                    patientName,
                    patientID,
                    modality,
                    seriesName,
                    seriesUID,
                    checksum,
                    imageNumber,
                    instanceUID,
                    pixelData,
                } = parseRaw(data);

                if (studyUID === undefined || seriesUID === undefined || instanceUID === undefined) {
                    next();
                    return;
                }

                // Merge
                studies = { 
                    ...studies,
                    [studyUID]: {
                    studyUID,
                    studyName,
                    studyDate,
                    patientName,
                    patientID,
                    modality,
                    location,
                    clientID: 4, 
                    }
                };

                series = {
                    ...series,
                    [seriesUID]: {
                        studyUID,
                        seriesName,
                        seriesUID, 
                        patientID, 
                    },
                };

                images = {
                    ...images,
                    [instanceUID]: {
                    path: newPath,
                    checksum,
                    imageNumber,
                    seriesUID,
                    studyUID,
                    instanceUID,
                    patientID,
                    location,
                    }
                };

                next();
            });

        });

        walker.on("errors", (root, nodeStatsArray, next) => {
            reject(nodeStatsArray);
            next();
        });

        walker.on("end", () => {
            console.log('DICOM walk done');
            resolve();
        });
    }))();



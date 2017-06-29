import walk from 'walk';
import fs from 'fs';

import parseRaw from '../parseRaw';

// TODO Might want to not cache pixeldata
// Caching entire file buffer
export const series = {};
export const studies = {};
export const images = {};
export const path = '../backup/test';

// Export API calls
export { default as queryStudies } from './queryStudies';
export { default as queryStudyByUID } from './queryStudyByUID';
export { default as querySeries } from './querySeries';
export { default as readFile } from './readFile';

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
                studies[studyUID] = {
                    studyUID,
                    studyName,
                    studyDate,
                    patientName,
                    patientID,
                    modality,
                    location,
                };
                series[seriesUID] = { studyUID, seriesName, seriesUID, patientID };
                images[instanceUID] = {
                    path: newPath,
                    checksum,
                    imageNumber,
                    seriesUID,
                    studyUID,
                    instanceUID,
                    patientID,
                    location,
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



import { series } from './';

export default async ({ studyUID }) => Object
    .values(series)
    .filter(v => v.studyUID === studyUID)
    .map(({ seriesUID, seriesName }) => ({
        seriesUID,
        seriesName,
    })) || [];

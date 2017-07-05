import { series } from './';

export default async ({ studyUID }) => series.filter(v => v.studyUID === studyUID);

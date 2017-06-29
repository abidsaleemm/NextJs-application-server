import { studies } from './';

export default async ({ studyUID, select = [] }) => {
    const { [studyUID]: study } = studies;
    return study;
};
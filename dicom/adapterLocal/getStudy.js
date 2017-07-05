import { studies } from './';

export default async ({ studyUID }) => {
    const { [studyUID]: study } = studies;
    return study;
};
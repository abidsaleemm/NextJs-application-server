// import { studies } from './';

export default async ({ studyUID, studies = {} }) => {
  const { [studyUID]: study } = studies;
  return study;
};

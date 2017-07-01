import { queryStudies } from '../dicom';
import { setProject } from '../projects';

export default async ({ studyUID, ...props }) => {
    setProject({ studyUID, props });
    return props;
};
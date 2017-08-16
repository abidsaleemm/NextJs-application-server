import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import getStatusName from '../helpers/getStatusName';
import getClientNameById from '../helpers/getClientNameById';

export default async () => {
    const studies = await getStudies();
    const projectsList = await getProjectList();
    const projects = studies.map(study => {
        const project = projectsList.find(({ studyUID }) => study.studyUID === studyUID);

        return project ?
            {
                ...study,
                status: getStatusName(project.status || 0),
                client: getClientNameById(project.client)
            } :
            { ...study, status: '' };
    });

    return projects;
}
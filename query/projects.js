import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import getStatusName from '../helpers/getStatusName';
import { getClients } from '../authUsers';

export default async () => {
    let studies = await getStudies();
    const projectsList = await getProjectList();
    const clientList = await getClients() || [];

    const refactoredStudies = studies.map (study => Object.assign ({}, study, {patientName: study.patientName.replace('^^^', '').replace('^', ' ')})); 

    studies = refactoredStudies;

    const projects = studies.map(study => {
        const project = projectsList.find(({ studyUID }) => study.studyUID === studyUID) || {};
        const { name: clientName } = clientList.find(({ id }) => id === project.client) || {};
        
        return project ?
            {
                ...study,
                status: getStatusName(project.status || 0),
                client: clientName,
            } :
            { ...study, status: '' };
    });

    return projects;
}
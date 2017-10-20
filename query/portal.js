import React from 'react';
import R from 'ramda';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import { videoExists } from '../video';
import { getClients } from '../authUsers';
import getStatusName from '../helpers/getStatusName';

export default async ({ clientId = 0, admin = false }) => {
    const studies = await getStudies();
    const clientList = await getClients() || [];

    // TODO Do query directly getProjectList instead of filtering with javascript
    let projects = await getProjectList();
    projects = await Promise.all(
        projects
            .filter(v => admin ? true : v.client == clientId) // TODO fix typing?
            .filter(({ studyUID }) => studyUID !== undefined) // Not sure if this will happen?
            .map(project => [project, studies.find(({ studyUID = '' }) => project.studyUID === studyUID)])
            .filter(([project, study]) => study)
            .map(async ([{ status, client, ...project }, { ...study, studyUID }]) => ({
                ...project,
                ...study,
                status: getStatusName(status || 0),
                videoExists: await videoExists({ studyUID }),
                client: (({ name = '' }) => name)(clientList.find(({ id }) => id === client) || {})
            })));

    const patients = projects.reduce((a, v) => {}, {});

    const test = R.uniqWith((v) => {
        // console.log('v', v);
        return v.patientName;
    })(projects);

    console.log('test', test);

    return { projects, patients };
}
import React from 'react';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import { videoExists } from '../video';

import getStatusName from '../helpers/getStatusName';

export default async ({ clientId = 0 }) => {
    let studies = await getStudies();

    // TODO Do query directly getProjectList instead of filtering with javascript
    let projects = await getProjectList();
    projects = await Promise.all(
        projects
            .filter(v => v.client == clientId) // TODO fix typing?
            .filter(({ studyUID }) => studyUID !== undefined) // Not sure if this will happen?
            .map(project => [project, studies.find(({ studyUID = '' }) => project.studyUID === studyUID)])
            .filter(([project, study]) => study)
            .map(async ([project, { ...study, studyUID }]) => ({
                ...project,
                ...study,
                status: getStatusName(project.status || 0),
                videoExists: await videoExists({ studyUID }),
            })));

    return { projects };
}
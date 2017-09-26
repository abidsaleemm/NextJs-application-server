import React from 'react';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import { videoExists } from '../video';

import getStatusName from '../helpers/getStatusName';

export default async ({ clientId = 0 }) => {
    let studies = await getStudies();

    // TODO Do query directly getProjectList instead of filtering with javascript
    let projects = await getProjectList();
    projects = await Promise.all(projects
        .filter(v => v.client == clientId) // TODO fix typing?
        .map(async project => {
            // Find matching Study
            const study = studies.find(({ studyUID }) => project.studyUID === studyUID);
            return { 
                ...project, 
                ...study,
                status: getStatusName(project.status || 0),
                videoExists: await videoExists({ studyUID: study.studyUID }),
            };
        })
    );

    return { projects };
}
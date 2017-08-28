import React from 'react';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';

export default async ({ clientId = 0 }) => {
    let studies = await getStudies();

    // TODO Do query directly getProjectList instead of filtering with javascript
    let projects = await getProjectList();
    projects = projects
        .filter(v => v.client == clientId) // TODO fix typing?
        .map(v => {
            // Find matching Study
            const study = studies.find(({ studyUID }) => v.studyUID === studyUID);
            return { ...v, ...study };
        })

    return { projects };
}
import React from 'react';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';

export default async ({ clientId = 0 }) => {
    const studies = await getStudies();

    // TODO Do query directly getProjectList instead of filtering with javascript
    let projects = await getProjectList();
    projects = projects
        .filter(v => v.client == clientId) // TODO fix typing?
        .map(v => {
            // Find matching Study
            const study = studies.find(({ studyUID }) => v.studyUID === studyUID);
            return { ...v, ...study };
        })
        .map(v => ({
             ...v,
            //  download: 'test', // TODO Add Link
            //  preview: <a>Preview</a>,
            //  invoice: <a>Invoice</a>,
            }))

    
    return { projects };
}
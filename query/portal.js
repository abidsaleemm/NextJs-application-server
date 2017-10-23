import React from 'react';
import R from 'ramda';
import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import { videoExists } from '../video';
import { getClientName } from "../authUsers";
import getStatusName from '../helpers/getStatusName';

export default async ({ clientID = 0, admin = false }) => {
    // TODO Do query directly getProjectList instead of filtering with javascript
    const projects = await getProjectList();

    let studies = await getStudies();
    studies = await Promise.all(
        studies
            .filter(study => admin ? true : study.clientID == clientID) // TODO fix typing?
            .map(study => [study, projects.find(({ studyUID = '' }) => study.studyUID === studyUID)])
            .map(async ([{ ...study, studyUID, clientID = 0 }, { status = 0, ...project } = {}]) => ({
                ...project,
                ...study,
                status: getStatusName(status || 0) || '',
                videoExists: await videoExists({ studyUID }),
                client: await getClientName({ clientID }),
            })));

    // const patients = projects.reduce((a, v) => {}, {});

    // TODO create distinct patient list
    const patients = R.uniqWith((a, b) => a.patientName === b.patientName)(studies)
        .map(({ client, patientName, patientID, patientBirthDate }) => {
            // studies.map(
            // )
            // const studies = [

            // ];
            return ({ 
                client,
                patientName,
                patientID,
                patientBirthDate,
                studies: studies
                    .filter(v => v.patientID === patientID)
                    .map(({ studyUID, studyName, status, location, client, videoExists }) => 
                        ({ studyUID, studyName, status, location, client, videoExists })),
            });
        });

    console.log('patients', patients);

    return { 
        projects: patients,
    };
}
import { getStudy } from '../dicom';
import {
    getProject,
    setProject,
    setProjectSnapshot,
} from '../projects';
import createProject from '../projects/createProject';
import { getClients } from "../authUsers";

export default async ({ studyUID }) => {
    let study = await getStudy({ studyUID });
    let project = await getProject({ studyUID });

    // TODO Should project creation be handled here?
    // TODO Add ability to select default template
    if (project === undefined) {
        console.log('Creating new project', studyUID);
        project = createProject({ studyUID }); // TODO Add function to create default from existing
        await setProject({ studyUID, props: { status: 1, client: 0 } });
        await setProjectSnapshot({ studyUID, payload: project });
    }

    // Merge project and study table
    const clientList = await getClients();
    return { ...project, ...study, studyUID, clientList };
}
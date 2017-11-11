import projects from './projects';
import projectDetail from './projectDetail';
import portal from './portal';
import invoice from './invoice';
import video from './video';
import uploadGet from './uploadGet';

export default (props) => {
    projects(props);
    projectDetail(props);
    portal(props);
    invoice(props);
    video(props);
    uploadGet(props);
};

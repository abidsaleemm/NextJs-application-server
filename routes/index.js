import projects from './projects';
import projectDetail from './projectDetail';
import client from './client';
import portal from './portal';

export default (props) => {
    projects(props);
    projectDetail(props);
    portal(props);
    client(props);
};

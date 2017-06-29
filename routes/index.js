import projects from './projects';
import projectDetail from './projectDetail';
import client from './client';
import portal from './portal';

// TODO maybe move ths to a separate directory named api?
import setProjectClient from './setProjectClient';
import setProjectStatus from './setProjectStatus';

export default (props) => {
    projects(props);
    projectDetail(props);
    portal(props);
    client(props);
    setProjectClient(props);
    setProjectStatus(props);
};

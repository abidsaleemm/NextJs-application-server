import queryProjectsList from '../helpers/queryProjectsList';
import { payloadProjects } from "../actions";

// import { del as uploadDel } from "../upload";

// export default async (props) => {
//   await uploadDel(props);
//   // setProject({ studyUID, props });
//   // return props;
// };

export default async ({ socket, action: props = {}}) => {
  // await uploadDel(props);
  //  Return payload
  // console.log("props", props);
  const projects = await queryProjectsList();
  // console.log("projects");
  socket.emit("action", payloadProjects({ projects }));
};

// export default async () => await queryProjectsList();

// import queryStudiesProjects from './queryStudiesProjects';
// import { getStudies } from "../dicom";
// import { getProjectList } from "../projects";
// import getStatusName from "../helpers/getStatusName";
// import { getClientInfo } from "../authUsers";
// export default async () => {
//   let studies = await getStudies();
//   const projectsList = await getProjectList();
//   const projects = await Promise.all(
//     studies.map(async ({ clientID = 0, ...study}) => {
//       const project =
//         projectsList.find(({ studyUID }) => study.studyUID === studyUID) || {};

//       const { name: client } = await getClientInfo({ clientID });
//       const status = getStatusName(parseInt(project.status) || 0);

//       return {
//         ...study,
//         client,
//         status,
//       };
//     })
//   );

  
//   return projects;
// };

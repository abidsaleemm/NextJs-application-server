import { del as uploadDel } from "../upload";

// export default async (props) => {
//   await uploadDel(props);
//   // setProject({ studyUID, props });
//   // return props;
// };

export default async ({ socket, action: props = {}}) => {
  await uploadDel(props);
};
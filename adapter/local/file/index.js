import list from "./list";
import get from "./get";
import put from "./put";
import del from "./del";

export default ({ path = "projectsLocal" }) => {
  const pathFiles = `${path}/uploads`;

  return {
    get: async ({ path, ...props }) =>
      await get({ ...props, path: `${pathFiles}/${path}` }),
    put: async ({ path, ...props }) =>
      await put({ ...props, path: `${pathFiles}/${path}` }),
    del: async ({ path, ...props }) =>
      await del({ ...props, path: `${pathFiles}/${path}` }),
    list: async ({ path, ...props }) =>
      await list({ ...props, path: `${pathFiles}/${path}` })
  };
};

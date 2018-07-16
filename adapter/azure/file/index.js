import get from "./get";
import put from "./put";
import list from "./list";
import del from "./del";

export default ({ blobAdapter, containerName = "uploads" }) => {
  return {
    get: async props =>
      await get({ ...props, blobAdapter, containerName }),
    put: async props =>
      await put({ ...props, blobAdapter, containerName }),
    del: async props =>
      await del({ ...props, blobAdapter, containerName }),
    list: async props =>
      await list({ ...props, blobAdapter, containerName })
  };
};

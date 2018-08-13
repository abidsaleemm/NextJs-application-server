import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// if (fs.existsSync(snapshotDir) === false) {
//     fs.mkdirSync(snapshotDir);
//   }

// TODO Finish up these functions.  Using lowdb for storaging locally.
// TODO Might want to rename these to something different

// TODO Add better error handling
const get = async ({ db, key }) => db.get(key);

const set = async ({ db, key, value = {} }) =>
  db.set(key, value).write();

// Returns the deleted value
const del = async ({ db, key }) => {
  const { [key]: value, ...state } = db.getState();
  db.setState(state);
  return value;
};

export default ({ path = "", tableName }) => {
  const tablesPath = `${path}/${tableName}.json`;
  const db = low(new FileSync(tablesPath));

  return {
    get: async props => await get({ ...props, db }),
    set: async props => await set({ ...props, db }),
    del: async props => await del({ ...props, db })
  };
};

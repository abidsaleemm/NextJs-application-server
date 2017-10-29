import low from 'lowdb';
import FileSync from'lowdb/adapters/FileSync';
import settingsStore from 'settingsStore';
const adapter = new FileSync('./settings/adapterJSON/db.json');
const db = low(adapter);
const store = settingsStore();
const init = store.getState();
const getUsers = ["5", "4", "3", "2", "1"]

// Set default state
db.defaults(getUsers.reduce((acc, user) => (
  {...acc, [user]: init})
,{})).write();

export const setSettings = (userId, settings) => {
  db.set(userId, settings ).write()
}

export const getSettings = userId => db.get(userId).value();


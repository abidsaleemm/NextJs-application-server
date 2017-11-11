import low from 'lowdb';
import FileSync from'lowdb/adapters/FileSync';
import settingsStore from 'settingsStore';
import { users } from '../../authUsers/local';
const adapter = new FileSync('./settings/adapterJSON/db.json');
const db = low(adapter);
const store = settingsStore();
const init = store.getState();
const getUsers = users.map(user => user.id);

// Set default state
db.defaults(getUsers.reduce((acc, user) => (
  {...acc, [user]: init})
,{})).write();

export const setSettings = (userId, settings) => {
  db.set(userId, settings ).write()
}

export const getSettings = userId => db.get(userId).value();


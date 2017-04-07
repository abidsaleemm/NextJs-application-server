import sqlite3 from 'sqlite3';

const databasePath = './localdb/multus.db';

// issue-4
// issue-6
export default () => ({
  getProjects: (callback = () => {}) => {
    try {
      const db = new sqlite3.Database(databasePath); // issue-5
      db.all(`
        SELECT id, studyuid, datetime, data
        FROM projects p1
        WHERE id = (SELECT max(id) from projects WHERE p1.studyuid = projects.studyuid)
        ORDER BY id DESC`, (err, rows = []) => {
          db.close();
          callback(null, rows.map(({ data }) =>
            JSON.parse(data)));
        });
    } catch(e) {
      callback(e);
    }
  },
  setProject: (studyUID = null, data = {}, callback = () => {}) => {
    try {
      const query = `
        INSERT INTO projects(studyuid, data)
        VALUES('${studyUID}', '${JSON.stringify(data)}')
      `;

      const db = new sqlite3.Database(databasePath); // issue-5
      db.run(query, (err) => {
        db.close();
        callback(err);
      });
    } catch(e) {
      callback(e)
    }
  },
});

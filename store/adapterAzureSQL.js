import { Connection, Request } from 'tedious';

// issue-1
// Move this to a different location
// Environment vars should be used instead of hard coded values
// should we pass this as arg?
const config = {
  userName: 'adminuser',
  password: '37f(#1?hfisw9*[d1647Q)',
  server: 'multus.database.windows.net',
  options: {
    requestTimeout: 0,
    rowCollectionOnRequestCompletion: true,
    encrypt: true,
    database: 'multus',
  }
}

// issue-4
// issue-6
export default () => ({
  getProjects: (callback = () => {}) => {
    const connection = new Connection(config);

    connection.on('error', (err) => {
      console.log('error', err); // TODO log in a file or azure log?
      callback(err);
    });

    connection.on('connect', (err) => {
      console.log('connect', err)
      if (err) return;

      const query = `
        SELECT id, studyuid, stamp, data
        FROM projects p1
        WHERE id = (SELECT max(id) from projects WHERE p1.studyuid LIKE projects.studyuid)
        ORDER BY id DESC
      `;

      const request = new Request(query, (err, rowCount, rows = []) => {
        const projects = rows.map(row => {
          const { value: data = '' } =
            row.find(({ metadata: { colName = '' } = {} }) =>
              colName === 'data')

          return JSON.parse(data);
        });

        connection.close();
        callback(err, projects);
      });

      connection.execSql(request);
    });
  },
  setProject: (studyUID = null, data = {}, callback = () => {}) => {
    const connection = new Connection(config);
    connection.on('error', (err) => {
      console.log('error', err); // TODO log in a file or azure log?
      callback(err)
    });

    connection.on('connect', (err) => {
      console.log('connect', err)
      if (err) return;

      const query = `
        INSERT INTO projects(studyuid, data)
        VALUES('${studyUID}', '${JSON.stringify(data)}')
      `;

      const request = new Request(query, (err, rowCount) => {
        connection.close();
        callback(err);
      });

      connection.execSql(request);
    });
  },
});

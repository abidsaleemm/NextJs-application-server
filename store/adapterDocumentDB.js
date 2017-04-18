import DocumentDB from 'documentdb';
const DocumentDBClient = DocumentDB.DocumentClient;

// TODO Remove these please. Use ENV vars.
const host = 'https://multus.documents.azure.com:443/'
const masterKey = 'WlTQTHdJ242WWVTX3jrRu7i2dDDbPnXlgwuO77mJzz469YnZlT0TPOdTHabfUpXrMndIYwyoXP0ykKy2nB3Q9Q==';

const databaseId = 'multus';
const collectionId = 'projects';

const dbLink = `dbs/${databaseId}`;
const collLink = `${dbLink}/colls/${collectionId}`;

// Query Builders
const queryStudyUID = (studyUID) => ({
  query: 'SELECT * FROM c WHERE c.studyUID = @studyUID',
  parameters: [
    {
      name: '@studyUID',
      value: studyUID,
    },
  ],
});

const queryProjects = () => ({
  query: 'SELECT * FROM c',
});

export default () => {
  const client = new DocumentDBClient( host, { masterKey });
  return {
    getProjects: (callback = () => {}) => {
      client.queryDocuments(
        collLink,
        queryProjects(),
        { enableCrossPartitionQuery: true }
      ).toArray((err, results = []) => {
        if (err) {
          console.log('err', err);
          return;
        }

        console.log('results', results)
      });
    },
    setProject: (studyUID = null, data = {}, callback = () => {}) => {
      client.queryDocuments(
        collLink,
        queryStudyUID(studyUID)
      ).toArray((err, results = []) => {
        if (err) {
          console.log('err', err);
          return;
        }

        // TODO update to create a new document everytime
        // This way your able to revert to previous version
        if (results.length === 0) {
          client.createDocument(collLink, data, (err, document) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log('created ' + document.id);
          });

          return;
        }

        // Update project
        const { 0: doc } = results;
        client.replaceDocument(
          doc._self,
          { id: doc.id, ...data },
          (err, replaced) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log('replaced', studyUID)
          });
      });
    },
  }
};

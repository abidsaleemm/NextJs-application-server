import { tableService } from "../";

const entriesMap = entries =>
  entries.map(entry =>
    Object.entries(entry).reduce(
      (a, [k, { _: v }]) => ({ ...a, [k]: v }),
      {}
    )
  );

const queryTable = ({ query, tableName, continuationToken = null }) =>
  new Promise((resolve, reject) => {
    // TODO uses async instead?
    tableService.queryEntities(
      tableName,
      query,
      continuationToken,
      (error, result, response) => {
        if (error) {
          reject();
          return;
        }

        const { entries = [], continuationToken } = result;
        const entriesMapped = entriesMap(entries);

        if (continuationToken !== (undefined || null)) {
          const values = queryTable({
            tableName,
            select,
            continuationToken
          }).then(
            values => {
              resolve([...entriesMapped, ...values]);
            },
            reason => reject(reason)
          );
        } else {
          resolve(entriesMapped);
        }
      }
    );
  });

export default props => queryTable(props);

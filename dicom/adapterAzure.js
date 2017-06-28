import azure from "azure-storage";

const fileService = azure.createFileService(
    process.env.APPSETTING_STORAGE2,
    process.env.APPSETTING_STORAGE2_KEY
);

const tableService = azure.createTableService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

const entriesMap = (entries) => entries.map(entry =>
    Object.entries(entry)
        .reduce((a, [k, { '_': v }]) =>
            ({ ...a, [k]: v }), {}));

const queryTable = ({ query, tableName, continuationToken = null }) =>
    new Promise((resolve, reject) => {
        tableService.queryEntities(
            tableName,
            query,
            continuationToken,
            (error, result, response) => {
                if (error) {
                    reject()
                    return;
                }

                const { entries = [], continuationToken } = result;
                const entriesMapped = entriesMap(entries);

                if (continuationToken !== (undefined || null)) {
                    const values = listStudies({ tableName, select, continuationToken })
                        .then(values => {
                            resolve([...entriesMapped, ...values])
                        }, reason => reject(reason));
                } else {
                    resolve(entriesMapped);
                }
            }
        );
    });

const queryTableAll = async ({
    tableName,
    select = [],
}) => {
    const query = new azure.TableQuery()
        .select(select);

    return await queryTable({ query, tableName });
}

export const queryStudies = async () => { // TODO Add filter flag? archive?
    const values = await queryTableAll({
        tableName: `${process.env.APPSETTING_CONTAINER}Studies`, // TODO is this good practice to use ENV cars mixed in?
        // select: ['studyName', 'studyUID', 'patientName']
    });

    return values;
};

export const queryStudyByUID = async ({ studyUID, select = [] }) => {
    const tableName = `${process.env.APPSETTING_CONTAINER}Studies`; // TODO create const in upper scope for the three types of tables
    const query = new azure.TableQuery()
        // .select(['studyName', 'studyUID', 'patientName'])
        .select(select)
        .where('RowKey eq ?', studyUID);

    const { 0: ret } = await queryTable({ query, tableName });
    return ret;
};

export const querySeries = async () => {
    const values = await queryTableAll({
        tableName: `${process.env.APPSETTING_CONTAINER}Series`,
        select: ['seriesName', 'seriesUID']
    });

    console.log('series', values);
    return values;
};

// TODO This is a hack for now and will need to be updated once blob storage is working with indexer
export const readFile = async ({ path }) => {
    // Make directory and filename from full path
    const indexLast = path.lastIndexOf("/");
    const indexFirst = path.indexOf("/");

    const file = path.substring(index + 1);
    const directory = path.substring(0, indexLast);
    const share = path.substring(0, indexFirst);

    const stream = fileService.createReadStream(
        share,
        directory,
        file,
    );

    const buffers = [];
    stream.on('data', (buffer) => {
        buffers.push(buffer);
    });

    stream.on('end', () => {
        const buffer = Buffer.concat(buffers);
        const tags = dicomReadRaw(buffer);
        return buffer;
    });

    stream.on('error', ({ name, message, statusCode }) => {
        console.log('error', name, message, statusCode);
    });
}
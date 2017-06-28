import queryTableAll from './helpers/queryTableAll';

export default async () => {
    const values = await queryTableAll({
        tableName: `${process.env.APPSETTING_CONTAINER}Studies`, // TODO is this good practice to use ENV cars mixed in?
    });

    return values;
};
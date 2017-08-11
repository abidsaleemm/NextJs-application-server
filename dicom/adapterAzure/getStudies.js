import queryTableAll from './helpers/queryTableAll';
import { tablePrefix } from './';

export default async () => await queryTableAll({
    tableName: `${tablePrefix}Studies`, // TODO is this good practice to use ENV cars mixed in?
});
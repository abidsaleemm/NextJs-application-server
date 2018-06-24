// import queryTableAll from './helpers/queryTableAll';
import { queryTableAll } from "../table";
// import { tablePrefix } from "./";

export default async ({ tablePrefix, tableService }) =>
  await queryTableAll({
    tableName: `${tablePrefix}Studies`, // TODO is this good practice to use ENV cars mixed in?
    tableService
  });

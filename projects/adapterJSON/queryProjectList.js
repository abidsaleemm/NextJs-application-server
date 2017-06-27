import fs from "fs";

import { checkExists, path } from './index';

export default  async () => {
  checkExists();
  if (path === undefined) return;

  const projects = fs
    .readdirSync(path)
    .map(v => JSON.parse(fs.readFileSync(`${path}/${v}`)));
};

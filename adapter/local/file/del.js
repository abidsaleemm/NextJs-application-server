import fs from "fs";

export default async ({ path }) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log(e);
  }
};

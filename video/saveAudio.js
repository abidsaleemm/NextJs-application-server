import { Writer, FileWriter } from 'wav';
import fs from 'fs';
import os from 'os';

export default async ({ session, index, data, format }) => {
    const fileName = `${index.toString().padStart(4, '0')}.wav`;
    const dirPath = `${os.tmpdir()}/${session}/audio`;
    const filePath = `${dirPath}/${fileName}`;

    // Create if does not exist
    try {
        fs.mkdirSync(`${os.tmpdir()}/${session}`);
    } catch (e) { }

    try {
        fs.mkdirSync(dirPath);
    } catch (e) { }

    const writer = new FileWriter(filePath, format);
    writer.write(data);
    writer.end();
};

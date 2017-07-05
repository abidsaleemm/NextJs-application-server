import fileService from './';

export default async ({ instanceUID, path }) => { // TODO instead of path change this to InstanceUID
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
        return buffer;
    });

    stream.on('error', ({ name, message, statusCode }) => {
        console.log('error', name, message, statusCode);
    });
}
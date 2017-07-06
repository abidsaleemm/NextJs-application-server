import { fileService } from '../';

export default ({ path = '' }) => new Promise((resolve, reject) => {
    const indexLast = path.lastIndexOf("/");
    const indexFirst = path.indexOf("/");

    const file = path.substring(indexLast + 1);
    const directory = path.substring(indexFirst + 1, indexLast);
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
        resolve(buffer);
    });

    stream.on('error', ({ name, message, statusCode }) => {
        console.log('error', name, message, statusCode);
        reject({ name, message, statusCode });
    });
});
import { blobService } from '../';

export default ({ instanceId = '' }) => new Promise((resolve, reject) => {
   const stream = blobService.createReadStream(
        process.env.DICOM_CONTAINER,
        instanceId
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
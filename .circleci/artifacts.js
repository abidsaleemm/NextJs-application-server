const fs = require('fs');
const wget = require('wget-improved');

const data = fs.readFileSync('artifacts.json');
const files = JSON.parse(data);
const pattern = 'dist/';
const token = '95563794a6ecfa8cedb8bdcf986d207af58ff39a';

files.map(({ path = '', url = '' }) => {
    const strippedPath = path.substring(path.indexOf(pattern) + pattern.length);
    const src = `${url}?circle-token=${token}`;

    // Make interface and render static directories
    try {
        fs.mkdirSync('./static/interface');
        fs.mkdirSync('./static/render');
    } catch (e) { }

    const download = wget.download(src, `./static/${strippedPath}`, {});
    download.on('error', (err) => {
        console.log('error', err);
    });

    download.on('end', (output) => {
        console.log('Finished ', strippedPath);
    });
});

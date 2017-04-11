import fs from 'fs';

const path = './projects';

// Add path if doesn't exist
const checkExists = () => {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path);
  }
}

export default () => ({
  getProjects: (callback = () => {}) => {
    checkExists();
    const projects = fs.readdirSync(path)
      .map(v => JSON.parse(fs.readFileSync(`${path}/${v}`)))
    callback(null, projects)
  },
  setProject: (studyUID = '_', data = {}, callback = () => {}) => {
    checkExists();
    fs.writeFileSync(
      `${path}/${studyUID}.json`,
      JSON.stringify(data)
    );
  },
});

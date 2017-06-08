const fs = require('fs');
const readFolderNamesSync = (path) => {
  const files = fs.readdirSync(path);

  const dirs = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      dirs.push(file);
    }
  }
  return dirs;
};

module.exports = readFolderNamesSync;
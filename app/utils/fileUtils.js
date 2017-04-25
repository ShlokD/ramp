import { remote } from 'electron';
import fs from 'fs';

const saveFileUtil = (text) => {
  const { dialog } = remote;

  return new Promise((resolve, reject) => {
    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined) {
        throw new Error('File name was not specified');
      }

      fs.writeFile(fileName, text, (err) => {
        if (err) {
          reject(err);
        }
        resolve(fileName);
      });
    });
  });
};

export default {
  saveFileUtil
};

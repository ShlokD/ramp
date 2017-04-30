import { saveFileUtil } from '../utils/fileUtils';
import { generateAction } from '../utils/actionUtils';

export const SAVE_FILE_REQUEST = 'SAVE_FILE_REQUEST';
export const saveFileRequest = () => generateAction(SAVE_FILE_REQUEST);

export const SAVE_FILE_SUCCESS = 'SAVE_FILE_SUCCESS';
export const saveFileSuccess = (fileName) => generateAction(SAVE_FILE_SUCCESS, fileName);

export const SAVE_FILE_ERROR = 'SAVE_FILE_ERROR';
export const saveFileError = (error) => generateAction(SAVE_FILE_ERROR, error);

export const saveFile = text => dispatch => {
  dispatch(saveFileRequest());
  saveFileUtil(text)
    .then((fileName) => dispatch(saveFileSuccess(fileName)))
    .catch((error) => dispatch(saveFileError(error)));
};

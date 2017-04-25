import { saveFileUtil } from '../utils/fileUtils';

export const SAVE_FILE_REQUEST = 'SAVE_FILE_REQUEST';
export const saveFileRequest = () => ({
  type: SAVE_FILE_REQUEST
});

export const SAVE_FILE_SUCCESS = 'SAVE_FILE_SUCCESS';
export const saveFileSuccess = (fileName) => ({
  type: SAVE_FILE_SUCCESS,
  fileName
});

export const SAVE_FILE_ERROR = 'SAVE_FILE_ERROR';
export const saveFileError = () => ({
  type: SAVE_FILE_ERROR
});

export const saveFile = text => dispatch => {
  dispatch(saveFileRequest());
  saveFileUtil(text).then(() => dispatch(saveFileSuccess)).catch(() => dispatch(saveFileError()));
};

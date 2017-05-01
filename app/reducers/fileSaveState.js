import { SAVE_FILE_REQUEST, SAVE_FILE_SUCCESS, SAVE_FILE_ERROR } from '../actions';
import { SAVE_FILE_IN_PROGRESS, SAVE_FILE_COMPLETED, SAVE_FILE_ERRORED } from '../constants/stringConstants';
import { genericReducer } from './genericReducer';

export const saveFileRequest = () => ({
  status: SAVE_FILE_IN_PROGRESS
});

export const saveFileSuccess = ({ fileName = '' }) => ({
  status: SAVE_FILE_COMPLETED,
  fileName
});

export const saveFileError = ({ error = {} }) => ({
  status: SAVE_FILE_ERRORED,
  error
});


export const fileSaveStateMap = {
  [SAVE_FILE_REQUEST]: saveFileRequest,
  [SAVE_FILE_SUCCESS]: saveFileSuccess,
  [SAVE_FILE_ERROR]: saveFileError
};


export const fileSaveState = (state = {}, action) =>
  genericReducer(fileSaveStateMap, state, action);

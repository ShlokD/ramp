export const generateAction = (type = '', params = {}) => ({
  type,
  ...params
});

export default {
  generateAction
};

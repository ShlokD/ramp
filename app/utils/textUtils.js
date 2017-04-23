import isEmpty from 'lodash/isEmpty';

const wordCounter = text => {
  if (!isEmpty(text)) {
    return text.match(/[\w\d]+/gi).length;
  }
  return 0;
};


export default {
  wordCounter
};

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

const findProp = (component, propName) => {
  if (component && component.find) {
    return get(component.props(), `${propName}`);
  }

  return undefined;
};

const areDeeplyEqual = (firstObject, secondObject) => isEqual(firstObject, secondObject);

const contains = (componentText, textToBeFound) => componentText.indexOf(textToBeFound) !== -1;

export default {
  findProp,
  areDeeplyEqual,
  contains
};

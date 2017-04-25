import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import omitBy from 'lodash/omitBy';


const wordCounter = text => {
  if (!isEmpty(text)) {
    return text.match(/[\w\d]+/gi).length;
  }
  return 0;
};

const wordFrequencyCounter = (wordMap, word) => {
  const wordMapCopy = Object.assign({}, wordMap);
  if (Object.prototype.hasOwnProperty.call(wordMapCopy, word.toLowerCase())) {
    wordMapCopy[word.toLowerCase()] += 1;
  } else {
    wordMapCopy[word.toLowerCase()] = 1;
  }
  return wordMapCopy;
};


const uniqueWordCounter = text => {
  if (text && text.match) {
    const words = text.match(/[\w\d]+/gi);
    const wordStats = reduce(words, wordFrequencyCounter, {});
    const uniqueWords = omitBy(wordStats, (wordStatValue) => wordStatValue !== 1);
    return Object.keys(uniqueWords).length;
  }
  return 0;
};


export default {
  wordCounter,
  wordFrequencyCounter,
  uniqueWordCounter
};

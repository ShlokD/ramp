import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
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

const wordStatsCounter = text => {
  if (text && text.match) {
    const words = text.match(/[\w\d]+/gi);
    const wordStats = reduce(words, wordFrequencyCounter, {});
    return wordStats;
  }
  return {};
};

const uniqueWordCounter = text => {
  const uniqueWordsCol = omitBy(wordStatsCounter(text), (wordStatValue) => wordStatValue !== 1);
  return Object.keys(uniqueWordsCol).length;
};

const mostFrequentWords = text => {
  if (!isEmpty(text)) {
    const frequentWordsArray = map(wordStatsCounter(text),
       (wordCount, word) => ({ word, wordCount }));

    frequentWordsArray.sort((a, b) => parseInt(b.wordCount, 10) - parseInt(a.wordCount, 10));
    return frequentWordsArray.slice(0, 3);
  }
  return [];
};


export default {
  wordCounter,
  wordFrequencyCounter,
  uniqueWordCounter,
  mostFrequentWords
};

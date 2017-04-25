import { wordCounter, uniqueWordCounter } from '../../app/utils/textUtils';

describe('wordCounter', () => {
  it('should return 0 for empty string', () => {
    const text = '';
    const expectedCount = 0;
    expect(wordCounter(text)).toBe(expectedCount);
  });

  it('should return 0 for undefined', () => {
    const text = undefined;
    const expectedCount = 0;
    expect(wordCounter(text)).toBe(expectedCount);
  });

  it('should return correct count for text', () => {
    const text = 'Some words in a sentence. Which are words too.';
    const expectedCount = 9;
    expect(wordCounter(text)).toBe(expectedCount);
  });
});

describe('uniqueWordCounter', () => {
  it('should return 0 for empty string', () => {
    const text = '';
    const expectedCount = 0;
    expect(uniqueWordCounter(text)).toBe(expectedCount);
  });

  it('should return 0 for undefined', () => {
    const text = undefined;
    const expectedCount = 0;
    expect(uniqueWordCounter(text)).toBe(expectedCount);
  });

  it('should return count of unique words', () => {
    const expectedUniqueWords = 4;
    const actualUniqueWords = uniqueWordCounter('This Dog is dog a test dog.');
    expect(actualUniqueWords).toBe(expectedUniqueWords);
  });
});

import { flipState } from '../../app/utils/stateUtils';


describe('flipState', () => {
  it('should flip values when current value is first value', () => {
    const currentValue = 1;
    const firstValue = 1;
    const secondValue = 2;
    const expectedValue = secondValue;
    expect(flipState(currentValue, firstValue, secondValue)).toBe(expectedValue);
  });

  it('should flip values when current value is second value', () => {
    const currentValue = 2;
    const firstValue = 1;
    const secondValue = 2;
    const expectedValue = firstValue;
    expect(flipState(currentValue, firstValue, secondValue)).toBe(expectedValue);
  });
});

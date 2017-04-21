const flipState = (currentValue, firstValue, secondValue) => {
  if (currentValue === firstValue) {
    return secondValue;
  }
  return firstValue;
};

export default {
  flipState
};

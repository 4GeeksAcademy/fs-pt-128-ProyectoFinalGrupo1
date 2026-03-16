export const countRequested = (tests, type) => {
  let counter = 0;
  for (let test of tests) {
    if (test.status === type) {
      counter += 1;
    }
  }
  return counter;
};

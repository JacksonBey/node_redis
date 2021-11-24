const index = require('./index.js');


test('sumNum takes 2 numbers and returns the sum', () => {
  expect(index.sumNum(2,3)).toBe(5);
})
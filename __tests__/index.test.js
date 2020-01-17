import func from '../src/index.js';


it('should return the truth', () => {
  expect(func()).toBe(true);
})
it('should return the truth, but it won\'t...', () => {
  expect(func()).toBe(false);
})
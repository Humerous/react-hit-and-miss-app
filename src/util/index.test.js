import { generateRandomNumber, getFeedback, getInitialState } from './index';

describe('game utilities', () => {
  test('generates integers in the inclusive range 1 to 100', () => {
    for (let index = 0; index < 500; index += 1) {
      const value = generateRandomNumber();
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  test.each([
    [0, 'You Won!'],
    [3, 'Extremely Hot!'],
    [4, 'Hot'],
    [9, 'Hot'],
    [10, 'Warm'],
    [19, 'Warm'],
    [20, 'Cold'],
  ])('returns the expected feedback at distance %i', (distance, message) => {
    expect(getFeedback(distance).feedbackMessage).toBe(message);
  });

  test('creates fresh game state', () => {
    const first = getInitialState();
    const second = getInitialState();
    expect(first.allGuesses).not.toBe(second.allGuesses);
    expect(first.attempt).toBe(0);
    expect(first.block).toBe(false);
  });
});

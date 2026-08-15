export const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export const getInitialState = () => ({
  actual: generateRandomNumber(),
  guess: undefined,
  allGuesses: [],
  attempt: 0,
  feedbackMessage: 'Make your first move',
  feedbackColor: '#d7b06a',
  block: false,
});

export const getFeedback = (absDiff) => {
  if (absDiff === 0) {
    return { feedbackColor: '#38C96B', feedbackMessage: 'You Won!' };
  }
  if (absDiff < 4) {
    return { feedbackColor: '#FF3B38', feedbackMessage: 'Extremely Hot!' };
  }
  if (absDiff < 10) {
    return { feedbackColor: '#FF8C00', feedbackMessage: 'Hot' };
  }
  if (absDiff < 20) {
    return { feedbackColor: '#F0A400', feedbackMessage: 'Warm' };
  }
  return { feedbackColor: '#4D82FE', feedbackMessage: 'Cold' };
};

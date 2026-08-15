import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import Form from './Form.jsx';

test('submits a numeric guess and clears the field', () => {
  const returnGuessToApp = vi.fn();
  const { container } = render(<Form block={false} returnGuessToApp={returnGuessToApp} />);
  const input = container.querySelector('input[name="guess"]');
  fireEvent.change(input, { target: { value: '42' } });
  fireEvent.submit(input.closest('form'));
  expect(returnGuessToApp).toHaveBeenCalledWith(42);
  expect(input.value).toBe('');
});

test('disables submissions after the winning guess', () => {
  const { getByRole } = render(<Form block returnGuessToApp={vi.fn()} />);
  expect(getByRole('button', { name: 'You won!' })).toBeDisabled();
});

test('rejects guesses outside the allowed integer range', () => {
  const returnGuessToApp = vi.fn();
  const { container } = render(<Form block={false} returnGuessToApp={returnGuessToApp} />);
  const input = container.querySelector('input[name="guess"]');

  fireEvent.change(input, { target: { value: '101' } });
  fireEvent.submit(input.closest('form'));

  expect(returnGuessToApp).not.toHaveBeenCalled();
  expect(input.value).toBe('101');
});

test('builds and submits a guess with the mechanical keypad', () => {
  const returnGuessToApp = vi.fn();
  const { getByRole } = render(<Form block={false} returnGuessToApp={returnGuessToApp} />);

  fireEvent.click(getByRole('button', { name: 'Number 4' }));
  fireEvent.click(getByRole('button', { name: 'Number 2' }));
  fireEvent.click(getByRole('button', { name: 'Commit guess' }));

  expect(returnGuessToApp).toHaveBeenCalledWith(42);
});

test('supports clearing and deleting keypad entries', () => {
  const { container, getByRole } = render(<Form block={false} returnGuessToApp={vi.fn()} />);
  const input = container.querySelector('input[name="guess"]');

  fireEvent.click(getByRole('button', { name: 'Number 4' }));
  fireEvent.click(getByRole('button', { name: 'Number 2' }));
  fireEvent.click(getByRole('button', { name: 'Delete last digit' }));
  expect(input.value).toBe('4');

  fireEvent.click(getByRole('button', { name: 'CLR' }));
  expect(input.value).toBe('');
});

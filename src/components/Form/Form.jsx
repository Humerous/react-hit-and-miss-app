import { useState } from 'react';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function Form({ block, returnGuessToApp }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const updateValue = (nextValue) => {
    setValue(nextValue.replace(/\D/g, '').slice(0, 3));
    setError('');
  };

  const pressKey = (key) => {
    if (block) return;
    if (key === 'clear') return updateValue('');
    if (key === 'backspace') return updateValue(value.slice(0, -1));
    updateValue(`${value}${key}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (block) return;
    const guess = Number(value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      setError('Enter a whole number from 1 to 100.');
      return;
    }
    returnGuessToApp(guess);
    setValue('');
    setError('');
  };

  return (
    <form className="guess-form" onSubmit={onSubmit}>
      <div className="input-bezel">
        <label htmlFor="guess">Enter combination</label>
        <input
          id="guess"
          type="text"
          name="guess"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(event) => updateValue(event.target.value)}
          placeholder="—"
          autoComplete="off"
          aria-describedby="guess-hint guess-error"
          disabled={block}
        />
        <span id="guess-hint">Whole number · 1–100</span>
      </div>

      <div className="keypad" aria-label="Number keypad">
        {keys.map((key) => (
          <button key={key} type="button" onClick={() => pressKey(key)} disabled={block} aria-label={`Number ${key}`}>{key}</button>
        ))}
        <button className="keypad-function" type="button" onClick={() => pressKey('clear')} disabled={block}>CLR</button>
        <button type="button" onClick={() => pressKey('0')} disabled={block} aria-label="Number 0">0</button>
        <button className="keypad-function" type="button" onClick={() => pressKey('backspace')} disabled={block} aria-label="Delete last digit">⌫</button>
      </div>

      <p className="form-error" id="guess-error" aria-live="polite">{error}</p>
      <button className="commit-button" type="submit" disabled={block}>
        <span aria-hidden="true" />{block ? 'You won!' : 'Commit guess'}
      </button>
    </form>
  );
}

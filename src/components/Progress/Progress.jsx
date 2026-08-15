const temperatureLabel = (feedbackMessage) => {
  if (feedbackMessage === 'Extremely Hot!') return 'Extreme';
  if (feedbackMessage === 'You Won!') return 'Hit';
  return feedbackMessage;
};

const temperatureClass = (feedbackMessage) => {
  if (feedbackMessage === 'Extremely Hot!') return 'extreme';
  if (feedbackMessage === 'You Won!') return 'hit';
  return feedbackMessage.toLowerCase();
};

const temperatureOrder = [
  { label: 'Cold', className: 'cold' },
  { label: 'Warm', className: 'warm' },
  { label: 'Hot', className: 'hot' },
  { label: 'Extreme', className: 'extreme' },
  { label: 'Hit', className: 'hit' },
];

export default function Progress({ attempt, guesses }) {
  const newestFirst = guesses.map((entry, index) => ({
    ...entry,
    sequence: index + 1,
  })).reverse();

  return (
    <section className="progress-section" aria-labelledby="attempt-heading">
      <div className="progress-heading">
        <h3 id="attempt-heading">Previous entries</h3>
        <span>{attempt} {attempt === 1 ? 'try' : 'tries'}</span>
      </div>

      <div className="temperature-key" aria-label="Temperature colour key">
        {temperatureOrder.map(({ label, className }) => (
          <span className={`temperature-key-item temp-${className}`} key={label}>
            <i aria-hidden="true" />{label}
          </span>
        ))}
      </div>

      <ol className="guess-history" aria-label="Previous guesses, newest first">
        {newestFirst.length === 0 && <li className="empty-history">No entries logged</li>}
        {newestFirst.map(({ guess, feedbackColor, feedbackMessage, sequence }) => {
          const temp = temperatureLabel(feedbackMessage);
          const tempClass = temperatureClass(feedbackMessage);
          return (
            <li
              key={`${guess}-${sequence}`}
              className={`guess-entry temp-${tempClass}`}
              style={{ '--guess-color': feedbackColor }}
              aria-label={`Attempt ${sequence}. Guess ${guess}. ${temp}.`}
            >
              <span className="guess-sequence">#{String(sequence).padStart(2, '0')}</span>
              <strong className="guess-number">{guess}</strong>
              <span className="guess-temperature"><i aria-hidden="true" />{temp}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

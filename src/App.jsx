import { useEffect, useRef, useState } from 'react';
import { Form, Info, Progress } from './components';
import { getFeedback, getInitialState } from './util';
import './App.css';

const feedbackClass = (message) => {
  if (message.startsWith('You Won')) return 'won';
  if (message.startsWith('Extremely')) return 'extremely-hot';
  return message.toLowerCase().replaceAll(' ', '-');
};

const getNeedleAngle = (message) => ({
  'Make your first move': -78,
  Cold: -72,
  Warm: -36,
  Hot: 0,
  'Extremely Hot!': 36,
  'You Won!': 72,
}[message] ?? 72);

const getGaugeStatus = (message) => ({
  'Make your first move': 'Ready',
  Cold: 'Cold',
  Warm: 'Warm',
  Hot: 'Hot',
  'Extremely Hot!': 'Extreme',
  'You Won!': 'Hit',
}[message] ?? 'Ready');

const celebrationPieces = Array.from({ length: 32 }, (_, index) => ({
  left: `${4 + ((index * 29) % 92)}%`,
  delay: `${(index % 8) * 0.08}s`,
  duration: `${1.55 + (index % 5) * 0.18}s`,
  drift: `${-42 + ((index * 23) % 84)}px`,
  rotate: `${90 + ((index * 71) % 260)}deg`,
}));

function WinModal({ attempts, target, onNewGame }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const startNewGame = () => {
    dialogRef.current?.close();
    onNewGame();
  };

  return (
    <dialog
      className="win-dialog"
      ref={dialogRef}
      aria-labelledby="win-title"
      aria-describedby="win-copy"
      onCancel={(event) => event.preventDefault()}
    >
      <div className="win-dialog-content">
        <div className="win-badge" aria-hidden="true">H/M</div>
        <p className="section-kicker">Target confirmed</p>
        <h2 id="win-title">You found it.</h2>
        <div className="win-number" aria-label={`Winning number ${target}`}>{target}</div>
        <p id="win-copy">Cracked in <strong>{attempts}</strong> {attempts === 1 ? 'attempt' : 'attempts'}.</p>
        <button className="commit-button win-new-game" type="button" onClick={startNewGame} autoFocus>
          New game
        </button>
      </div>
    </dialog>
  );
}

export default function App() {
  const [game, setGame] = useState(getInitialState);

  const updateGame = (guess) => {
    setGame((current) => {
      const distance = Math.abs(guess - current.actual);
      const feedback = getFeedback(distance);
      return {
        ...current,
        guess,
        allGuesses: [...current.allGuesses, { guess, ...feedback }],
        attempt: current.attempt + 1,
        feedbackMessage: feedback.feedbackMessage,
        block: distance === 0,
      };
    });
  };

  const resetGame = () => setGame(getInitialState());
  const lastGuess = game.allGuesses.at(-1)?.guess;
  const direction = lastGuess && !game.block
    ? (lastGuess > game.actual ? 'Too high' : 'Too low')
    : '';
  const signal = game.block
    ? 'Target acquired'
    : direction
      ? `${game.feedbackMessage.replace('!', '')} — ${direction}`
      : 'Awaiting your first guess';

  return (
    <main className={`app-shell signal-${feedbackClass(game.feedbackMessage)}${game.block ? ' is-winner' : ''}`}>
      <div className="film-grain" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      {game.block && (
        <div className="win-celebration" aria-hidden="true">
          <div className="victory-flash" />
          {celebrationPieces.map((piece, index) => (
            <i
              key={index}
              style={{
                '--piece-left': piece.left,
                '--piece-delay': piece.delay,
                '--piece-duration': piece.duration,
                '--piece-drift': piece.drift,
                '--piece-rotate': piece.rotate,
              }}
            />
          ))}
        </div>
      )}

      {game.block && <WinModal attempts={game.attempt} target={lastGuess} onNewGame={resetGame} />}

      <header className="masthead">
        <div className="brand" aria-label="Hit or Miss">
          <span className="brand-monogram" aria-hidden="true">H/M</span>
          <span className="brand-copy"><strong>Hit or Miss</strong><small>Number detection apparatus</small></span>
        </div>
        <div className="round-status"><i aria-hidden="true" /> {game.block ? 'Round complete' : 'System armed'}</div>
      </header>

      <section className="stage" aria-labelledby="game-title">
        <div className="title-block">
          <p className="overline">One number. One hundred possibilities.</p>
          <h1 id="game-title">Find the<br /><span>hidden number.</span></h1>
          <p>Read the signal. Trust your instinct. Crack the sequence in as few attempts as possible.</p>
        </div>

        <section className="apparatus" aria-label="Hit or Miss guessing apparatus">
          <div className="apparatus-screw screw-one" aria-hidden="true" />
          <div className="apparatus-screw screw-two" aria-hidden="true" />
          <div className="apparatus-screw screw-three" aria-hidden="true" />
          <div className="apparatus-screw screw-four" aria-hidden="true" />

          {game.block && (
            <div className="victory-plaque" aria-hidden="true">
              <span>Target found</span>
              <strong>{lastGuess}</strong>
            </div>
          )}

          <div className="machine-header">
            <div><span>H/M–100</span><small>Precision range finder</small></div>
            <div className="serial">SER. 0317<br />RANGE 01–100</div>
          </div>

          <div className="instrument-panel">
            <div className="gauge-wrap">
              <div
                className={`gauge gauge-state-${feedbackClass(game.feedbackMessage)}`}
                role="img"
                aria-label={`Proximity gauge: ${getGaugeStatus(game.feedbackMessage)}`}
              >
                <div className="gauge-face" aria-hidden="true">
                  <div className="gauge-arc" />
                  <div className="gauge-needle" style={{ '--needle-angle': `${getNeedleAngle(game.feedbackMessage)}deg` }} />
                  <div className="gauge-hub" />
                  <div className="gauge-readout">
                    <small>Proximity</small>
                    <strong>{getGaugeStatus(game.feedbackMessage)}</strong>
                  </div>
                </div>
                <div className="gauge-legend" aria-hidden="true">
                  <span className="legend-cold"><i />Cold</span>
                  <span className="legend-warm"><i />Warm</span>
                  <span className="legend-hot"><i />Hot</span>
                  <span className="legend-extreme"><i />Extreme</span>
                  <span className="legend-hit"><i />Hit</span>
                </div>
                <div className="gauge-direction" aria-hidden="true">
                  <span>Far</span><b>Closer to target</b><span>Exact</span>
                </div>
              </div>
            </div>

            <div className={`signal-display ${feedbackClass(game.feedbackMessage)}`} role="status" aria-live="polite">
              <span className="signal-caption">Signal report</span>
              <strong>{signal}</strong>
              <small>{game.block ? `Target confirmed: ${lastGuess} · ${game.attempt} ${game.attempt === 1 ? 'attempt' : 'attempts'}` : 'Adjust and try again'}</small>
            </div>
          </div>

          <div className="control-panel">
            <Form block={game.block} returnGuessToApp={updateGame} />
            <aside className="round-data" aria-label="Current round information">
              <div className="counter"><span>{String(game.attempt).padStart(2, '0')}</span><small>Attempts</small></div>
              <Progress attempt={game.attempt} guesses={game.allGuesses} />
              <div className="machine-actions">
                <button className="utility-button" type="button" onClick={resetGame}>New round</button>
                <Info />
              </div>
            </aside>
          </div>

          <div className="machine-footer"><span>Calibrated for intuition</span><span>Made for quick minds</span></div>
        </section>
      </section>

      <footer className="page-footer"><span>Guess responsibly</span><span>© Hit or Miss</span></footer>
    </main>
  );
}

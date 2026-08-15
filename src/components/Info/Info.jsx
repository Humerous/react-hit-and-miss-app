import { useRef } from 'react';

export default function Info() {
  const dialogRef = useRef(null);
  return (
    <>
      <button className="utility-button rules-button" type="button" onClick={() => dialogRef.current?.showModal()}>Instructions</button>
      <dialog ref={dialogRef} aria-labelledby="rules-title">
        <div className="dialog-content">
          <p className="section-kicker">Operating instructions</p>
          <h2 id="rules-title">Crack the sequence</h2>
          <p className="dialog-copy">Use the apparatus to locate one hidden number.</p>
          <ol className="rule-list">
            <li>Choose any whole number from 1 to 100.</li>
            <li>Use the temperature signal to adjust your next guess.</li>
            <li>Find the hidden number in as few attempts as possible.</li>
            <li>Start a new round whenever you want a fresh target.</li>
          </ol>
          <button className="commit-button dialog-close" type="button" onClick={() => dialogRef.current?.close()}>Understood</button>
        </div>
      </dialog>
    </>
  );
}

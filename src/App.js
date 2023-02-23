import './App.css';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CheckSequence, { Hints } from './Sequence';

const SuccessMessages = [
  "You guessed it! Now what's the rule?",
  "Great job! Can you guess the pattern?",
  "You figured it out! What's the pattern?",
  "You have the right idea! What's the rule?",
  "You got it. Now what's the rule?",
  "Good job! What's the pattern?"
];

const FailureMessages = [
  "Hmm. That's not quite right.",
  "Almost. Keep trying.",
  "You're getting there...",
  "Close, but no cigar.",
  "Try again!",
  "Don't give up. You'll figure it out."
];

const FAILS_PER_HINT = 4;

function sanitizeGuess(guess) {
  guess = guess.replace(/(^\s*,*)|(,*\s*$)/g, '');
  guess = guess.replace(/(,\s*)+/g, ', ');
  return guess;
}

function strToList(str) {
  const list = str.split(',').map(Number);
  if (list.includes(NaN)) return null;
  return list;
}

function choose(list) {
  return list[Math.floor(Math.random()*list.length)];
}

function App() {
  const [guess, setGuess] = useState("");
  const [failed, setFailed] = useState(0);
  const [hint, setHint] = useState(null);
  const [attempts, setAttempts] = useState(new Set());

  useEffect(() => {
    let hintIndex = Math.floor(failed / FAILS_PER_HINT);
    if (hintIndex === 0) return;
    hintIndex -= 1;
    if (hintIndex >= Hints.length) return;
    setHint(Hints[hintIndex]);
  }, [failed]);

  const onGuessChange = evt => {
    setGuess(evt.target.value);
  }

  const onGuess = evt => {
    toast.dismiss();
    evt.preventDefault();

    // Sanitize and update input
    const sanitized = sanitizeGuess(guess);
    setGuess(sanitized);

    // Convert string to list of numbers
    const list = strToList(sanitized);
    if (list === null) {
      toast.error("That's not a list of numbers!");
      return;
    }

    if (CheckSequence(list)) {
      // toast.success(choose(SuccessMessages));
      toast.success(choose(SuccessMessages));
    } else {
      if (!attempts.has(sanitized)) setFailed(failed + 1);
      toast.error(choose(FailureMessages));
    }

    setAttempts(attempts.add(sanitized));
  }

  return (
    <div id='App-Container'>
      <main className='container' id='App'>
        <article className='grid'>
          <div>
            <hgroup>
              <h1>Sequences!</h1>
              <h2>{hint === null ? <span>Enter a sequence below and press <b>Guess</b> to see if you're right!</span> : hint}</h2>
            </hgroup>
            <form onSubmit={onGuess}>
              <input type="text" name="sequence" placeholder="1, 2, 3..." aria-label="Sequence" required value={guess} onChange={onGuessChange} />
              <button type="submit" className="contrast">Guess</button>
            </form>
          </div>
        </article>
      </main>
      <Toaster />
    </div>
  );
}

export default App;

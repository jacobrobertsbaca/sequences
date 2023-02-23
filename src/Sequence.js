function getNthNumber(n) {
    const f = n => n + Math.floor(Math.log2(n + Math.log2(n)));
    return f(n + 1);
}

function generateSequence(n) {
    const seq = [];
    for (let i = 1; i <= n; i++)
        seq.push(getNthNumber(i));
    return seq;
}

function generateHints(n) {
    const hints = [];
    for (let i = 1; i <= n; i++) {
        const seq = generateSequence(i).toString();
        hints.push(<span><b>Hint:</b> The first {i === 1 ? <span>number</span> : <b>{i} numbers</b> } in the sequence {i === 1 ? 'is' : 'are'} <b>{seq}</b>.</span>);
    }

    return hints;
}

export default function sequenceCorrect(seq)
{
    for (let i = 0; i < seq.length; i++)
        if (getNthNumber(i + 1) !== seq[i])
            return false;
    return true;
}

export const Hints = Object.freeze(generateHints(20));
import React, { useContext, useEffect } from 'react';
import { AppContext } from './Wordle';

const Letter = ({ attemptVal, letterPos }) => {
    const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== '' && correctWord.toUpperCase().includes(letter);

    let letterState;
    if (currAttempt.attempt > attemptVal) {
        if (correct) {
            letterState = 'correct'
        } else if (almost) {
            letterState = 'almost'
        } else {
            letterState = 'error'
        }
    }

    useEffect(() => {
        if (letter && !correct && !almost) {
            setDisabledLetters(prev => [...prev, letter])
        }
    }, [currAttempt.attempt, correct, almost, setDisabledLetters, letter])


    return (
        <div className='letter' id={letterState}>{letter}</div>
    )
}

export default Letter
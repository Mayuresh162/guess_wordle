import React, { useState, createContext, useEffect } from 'react'
import Board from './Board'
import Keyboard from './Keyboard'
import { defaultBoard, generateWordSet } from '../utils/wordsHelper';
import GameOver from './GameOver';

export const AppContext = createContext();

const Wordle = () => {
    const [board, setBoard] = useState(defaultBoard);
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false});
    const [correctWord, setCorrectWord] = useState('')


    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord)
        })
    }, [])

    const onSelectHandler = (keyVal) => {
        if (currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})    
    }

    const onClearHandler = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
    }

    const onEnterHandler = () => {
        if (currAttempt.letterPos !== 5) return;
        let currWord = '';
        for (let i=0; i<5; i++) {
            currWord += board[currAttempt.attempt][i]
        }
        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
        } else {
            alert('Word not found')
        }

        if (currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true})
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false})
        }
    }

    return (
        <div className='App'>
            <div className='nav'>
                <h1>Wordle</h1>
            </div>
            <div className='game'>
                <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, gameOver, setGameOver,
                    onSelectHandler, onClearHandler, onEnterHandler, correctWord, setDisabledLetters, disabledLetters }}> 
                    <Board />
                    {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </AppContext.Provider>
            </div>
        </div>
    )
}

export default Wordle
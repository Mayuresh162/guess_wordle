import wordbank from './wordle_bank.txt';

export const defaultBoard = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordbank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\n').map(elem => elem.slice(0,5));
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
            wordSet = new Set([...wordArr]);
        })

    return { wordSet, todaysWord }; 
}
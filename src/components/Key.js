import React, { useContext } from 'react';
import { AppContext } from './Wordle';

const Key = ({ keyVal, bigKey, disabled }) => {
    const { onSelectHandler, onClearHandler, onEnterHandler  } = useContext(AppContext);

    const selectLetter = () => {
        if (keyVal === 'ENTER') {
            onEnterHandler();
        } else if (keyVal === 'CLEAR') {
            onClearHandler();
        } else {
           onSelectHandler(keyVal)
        }
    }
    return (
        <div className='key' id={bigKey ? 'big' : disabled && 'disabled'} onClick={() => selectLetter()}>{keyVal}</div>
    )
}

export default Key
import { useState } from 'react';
import Game from './components/game';
import './App.scss';

function App() {
    const minHeight = 5;
    const minWidth = 5;
    const [height, setHeight] = useState<number | undefined>();
    const [width, setWidth] = useState<number | undefined>();
    const snakeLength = 4;
    const bufferTurns = 2;

    return (
        <div className='container'>
            <div className='fields'>
                <span>Height</span><input type={'number'} min={minHeight} onChange={(event) => setHeight(parseInt(event.target.value))}></input>
                <span>Width</span><input type={'number'} min={minWidth} onChange={(event) => setWidth(parseInt(event.target.value))}></input>
            </div>

            {
                height && width && height >= minHeight && width >= minWidth &&
                <Game height={height} width={width} snakeLength={snakeLength} bufferTurns={bufferTurns} />
            }
        </div>
    );
}

export default App;

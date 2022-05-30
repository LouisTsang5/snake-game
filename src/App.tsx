import { useState } from 'react';
import Game from './components/game';

function App() {
    const minHeight = 5;
    const minWidth = 5;
    const [height, setHeight] = useState<number | undefined>();
    const [width, setWidth] = useState<number | undefined>();
    const snakeLength = 4;
    const bufferTurns = 2;

    return (
        <>
            <span>Height</span><input type={'number'} min={minHeight} onChange={(event) => setHeight(parseInt(event.target.value))}></input>
            <span>Width</span><input type={'number'} min={minWidth} onChange={(event) => setWidth(parseInt(event.target.value))}></input>
            {
                height && width && height >= minHeight && width >= minWidth &&
                <Game height={height} width={width} snakeLength={snakeLength} bufferTurns={bufferTurns} />
            }
        </>
    );
}

export default App;

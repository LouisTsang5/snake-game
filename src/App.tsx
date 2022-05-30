import Game from './components/game';

function App() {
    return (
        <Game height={10} width={10} snakeLength={4} bufferTurns={2} />
    );
}

export default App;

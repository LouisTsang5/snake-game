import { Board } from "./components/board";

function App() {
    return (
        <div>{Board({ height: 10, width: 10, snake: [[1, 1], [1, 2], [1, 3]] })}</div>
    );
}

export default App;

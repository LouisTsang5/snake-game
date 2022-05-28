import { useEffect, useState } from "react";
import { Board } from "./components/board";

enum Direction {
    Up, Down, Left, Right
}

function move(snake: number[][], direction: Direction) {
    const newSnake: number[][] = [];

    let newHead = snake[0];
    switch (direction) {
        case Direction.Left:
            newHead = [snake[0][0] - 1, snake[0][1]];
            break;
        case Direction.Right:
            newHead = [snake[0][0] + 1, snake[0][1]];
            break;
        case Direction.Up:
            newHead = [snake[0][0], snake[0][1] - 1];
            break;
        case Direction.Down:
            newHead = [snake[0][0], snake[0][1] + 1];
            break;
    }
    newSnake.push(newHead);

    for (let i = 0; i < snake.length - 1; i++) newSnake.push(snake[i]);
    return newSnake;
}

function canMove(snake: number[][], direction: Direction) {
    const head = snake[0];
    const body = snake[1];
    if (direction === Direction.Left && head[0] - 1 === body[0]) return false;
    if (direction === Direction.Right && head[0] + 1 === body[0]) return false;
    if (direction === Direction.Up && head[1] - 1 === body[1]) return false;
    if (direction === Direction.Down && head[1] + 1 === body[1]) return false;
    return true;
}

function App() {
    const startSnake = [[1, 3], [1, 2], [1, 1]];
    const startDirection = Direction.Down;
    const [snake, setSnake] = useState(startSnake);
    const [direction, setDirection] = useState(startDirection);
    const [isLost, setIsLost] = useState(false);
    const height = 30;
    const width = 30;

    function moveSnake() {
        const newSnake = move(snake, direction);
        if (newSnake[0][0] >= width || newSnake[0][0] < 0 || newSnake[0][1] >= height || newSnake[0][1] < 0) setIsLost(true);
        else setSnake(newSnake);
    }

    function onClickMoveLeft() {
        if (canMove(snake, Direction.Left)) setDirection(Direction.Left);
    }

    function onClickMoveRight() {
        if (canMove(snake, Direction.Right)) setDirection(Direction.Right);
    }

    function onClickMoveUp() {
        if (canMove(snake, Direction.Up)) setDirection(Direction.Up);
    }

    function onClickMoveDown() {
        if (canMove(snake, Direction.Down)) setDirection(Direction.Down);
    }

    function onClickRestart() {
        setSnake(startSnake);
        setDirection(startDirection);
        setIsLost(false);
    }

    function handleKeyPress(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowLeft':
                onClickMoveLeft();
                break;
            case 'ArrowRight':
                onClickMoveRight();
                break;
            case 'ArrowDown':
                onClickMoveDown();
                break;
            case 'ArrowUp':
                onClickMoveUp();
                break;
            case ' ':
                moveSnake();
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [snake]);

    useEffect(() => {
        if (!isLost) {
            setTimeout(moveSnake, 300);
        }

        return () => {
        };
    }, [snake, isLost]);

    return (
        <>
            <div>{Board({ height, width, snake })}</div>
            <button onClick={onClickRestart}>Restart</button>
            {
                isLost && <span>You Lost</span>
            }
        </>
    );
}

export default App;

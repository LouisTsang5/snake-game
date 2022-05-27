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
    if (direction === Direction.Left && snake[0][0] - 1 === snake[1][0]) return false;
    if (direction === Direction.Right && snake[0][0] + 1 === snake[1][0]) return false;
    if (direction === Direction.Up && snake[0][1] - 1 === snake[1][1]) return false;
    if (direction === Direction.Down && snake[0][1] + 1 === snake[1][1]) return false;
    return true;
}

function App() {
    const [snake, setSnake] = useState([[1, 3], [1, 2], [1, 1]]);
    const [direction, setDirection] = useState(Direction.Down);
    const height = 30;
    const width = 30;

    function moveSnake() {
        setSnake(move(snake, direction));
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
        document.addEventListener('keydown', handleKeyPress, false);

        return () => {
            document.removeEventListener('keydown', handleKeyPress, false);
        };
    });

    return (
        <>
            <div>{Board({ height, width, snake })}</div>
            <span>{Direction[direction]}</span>
        </>
    );
}

export default App;

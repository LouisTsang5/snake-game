import { useCallback, useEffect, useRef, useState } from "react";
import { Board } from "./components/board";

export type Snake = [number, number][];

enum Direction {
    Up, Down, Left, Right
}

function move(snake: Snake, direction: Direction) {
    const newSnake: Snake = [];

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

function canMove(snake: Snake, direction: Direction) {
    const head = snake[0];
    const body = snake[1];
    if (direction === Direction.Left && head[0] - 1 === body[0]) return false;
    if (direction === Direction.Right && head[0] + 1 === body[0]) return false;
    if (direction === Direction.Up && head[1] - 1 === body[1]) return false;
    if (direction === Direction.Down && head[1] + 1 === body[1]) return false;
    return true;
}

function isGameOver(snake: Snake, height: number, width: number) {
    const isOutofBounds = snake[0][0] >= width || snake[0][0] < 0 || snake[0][1] >= height || snake[0][1] < 0;
    // const isTouchedSelf = 
    return isOutofBounds;
}

function App() {
    const startSnake: Snake = [[1, 8], [1, 7], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1]];
    const startDirection = Direction.Down;
    const [snake, setSnake] = useState(startSnake);
    const [direction, setDirection] = useState(startDirection);
    const [isLost, setIsLost] = useState(false);
    const height = 30;
    const width = 30;

    const prevDirection = useRef<Direction>();
    useEffect(() => {
        prevDirection.current = direction;
    }, [direction]);

    const moveSnake = useCallback(() => {
        const newSnake = move(snake, direction);
        if (isGameOver(newSnake, height, width)) setIsLost(true);
        else setSnake(newSnake);
    }, [direction, snake]);

    const onSetDirection = useCallback((direction: Direction) => {
        if (canMove(snake, direction)) setDirection(direction);
    }, [snake]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                onSetDirection(Direction.Left);
                break;
            case 'ArrowRight':
                onSetDirection(Direction.Right);
                break;
            case 'ArrowDown':
                onSetDirection(Direction.Down);
                break;
            case 'ArrowUp':
                onSetDirection(Direction.Up);
                break;
        }
    }, [onSetDirection]);

    function onClickRestart() {
        setSnake(startSnake);
        setDirection(startDirection);
        setIsLost(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (prevDirection.current !== direction) moveSnake();
        if (!isLost) {
            timeout = setTimeout(moveSnake, 300);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [direction, isLost, moveSnake]);

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

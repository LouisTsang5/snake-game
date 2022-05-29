import { useCallback, useEffect, useState } from "react";
import { Board } from "./components/board";
import { getRandomInt, isInclude, getRandomEnum } from "./components/utils";

export type Snake = [number, number][];

export type Food = [number, number];

export type Point = [number, number];

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

function isTouchedSelf(snake: Snake) {
    return snake.map((body, i) => {
        const remainBody = snake.slice();
        remainBody.splice(i, 1);
        return isInclude(body, remainBody);
    }).reduce((acc, cur) => acc || cur);
}

function isOutOfBounds(snake: Snake, height: number, width: number) {
    return snake[0][0] >= width || snake[0][0] < 0 || snake[0][1] >= height || snake[0][1] < 0;
}

function isGameOver(snake: Snake, height: number, width: number) {
    return isOutOfBounds(snake, height, width) || isTouchedSelf(snake);
}

function getRandomPointInBoard(height: number, width: number): [number, number] {
    return [getRandomInt(width), getRandomInt(height)] as Point;
}

function getNewFood(height: number, width: number, snake: Snake): Food {
    const newFood = getRandomPointInBoard(height, width) as Food;
    if (isInclude(newFood, snake)) return getNewFood(height, width, snake);
    return newFood;
}

function getNewSnake(height: number, width: number, length: number, curSnake?: Snake): Snake {
    const snake = curSnake ? curSnake : [getRandomPointInBoard(height, width)] as Snake;

    if (snake.length >= length) return snake;

    let nextBody: Point | undefined;
    while (!nextBody) {
        const randomDirection = getRandomEnum(Direction);
        if (snake.length <= 1) {
            nextBody = move(snake, randomDirection)[0];
            if ((nextBody && nextBody[0] < 0) || (nextBody && nextBody[1] < 0)) return getNewSnake(height, width, length, curSnake);
            continue;
        }
        const lastBody = [snake[snake.length - 1], snake[snake.length - 2]] as Snake;
        nextBody = canMove(lastBody, randomDirection) ? move(lastBody, randomDirection)[0] : undefined;
        if ((nextBody && nextBody[0] < 0) || (nextBody && nextBody[1] < 0)) nextBody = undefined;
    }
    snake.push(nextBody);
    return getNewSnake(height, width, length, snake);
}

function getRandomDirection(snake: Snake, height: number, width: number, buffer = 1): Direction {
    const randomDirection = getRandomEnum(Direction);
    let newSnake = move(snake, randomDirection);
    for (let i = 0; i < buffer; i++) {
        if (isGameOver(newSnake, height, width))
            return getRandomDirection(snake, height, width, buffer);
        newSnake = move(newSnake, randomDirection);
    }
    return randomDirection;
}

const height = 30;
const width = 30;
const startSnakeLength = 4;
const bufferTurns = 3; //The start snake can move at least this many turns before losing
const startSnake = getNewSnake(height, width, startSnakeLength);
const startDirection = getRandomDirection(startSnake, height, width, bufferTurns);
let direction = startDirection;

function App() {
    const [snake, setSnake] = useState(startSnake);
    const [food, setFood] = useState(getNewFood(height, width, startSnake));
    const [isLost, setIsLost] = useState(false);

    const moveSnake = useCallback(() => {
        const oldSnake = snake;
        let newSnake = move(oldSnake, direction);

        if (isGameOver(newSnake, height, width)) {
            setIsLost(true);
            return;
        }

        if (isInclude(food, newSnake)) {
            newSnake = [food, ...oldSnake];
            setFood(getNewFood(height, width, newSnake));
        }

        setSnake(newSnake);
    }, [snake, food]);

    const onSetDirection = useCallback((newDirection: Direction) => {
        if (canMove(snake, newDirection)) direction = newDirection;
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
        setFood(getNewFood(height, width, startSnake));
        direction = startDirection;
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
        if (!isLost) {
            timeout = setTimeout(moveSnake, 300);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [isLost, moveSnake]);

    return (
        <>
            <div>{Board({ height, width, snake, food })}</div>
            <button onClick={onClickRestart}>Restart</button>
            {
                isLost && <span>You Lost</span>
            }
        </>
    );
}

export default App;

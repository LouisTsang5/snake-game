import { Cell, CellState } from "./cell";
import styles from './board.module.css';

interface BoardProps {
    height: number,
    width: number,
    snake: number[][],
}

function isInclude(cellList: number[][], cell: number[]) {
    for (let i = 0; i < cellList.length; i++) {
        if (cellList[i].length !== cell.length) continue;
        const body = cellList[i];
        if (body[0] === cell[0] && body[1] === cell[1]) return true;
    }
    return false;
}

export function Board({ height, width, snake }: BoardProps) {
    const board: JSX.Element[][] = [];
    for (let i = 0; i < height; i++) {
        const row: JSX.Element[] = [];
        for (let j = 0; j < width; j++) {
            const cell = [i, j];
            if (isInclude(snake, cell)) row.push(<Cell state={CellState.Snake}></Cell>);
            else row.push(<Cell state={CellState.Empty}></Cell>)
        }
        board.push(row);
    }

    return (
        <div>
            {
                board.map(row => {
                    return (
                        <div className={styles.row}>
                            {
                                row.map(cell => {
                                    return (
                                        <div className={styles.cell}>
                                            {cell}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}
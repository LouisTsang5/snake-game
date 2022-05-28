import { Cell, CellState } from "./cell";
import styles from './board.module.css';
import { Snake } from "../App";

interface BoardProps {
    height: number,
    width: number,
    snake: Snake,
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
    for (let y = 0; y < height; y++) {
        const row: JSX.Element[] = [];
        for (let x = 0; x < width; x++) {
            const cell = [x, y];
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
import { Cell, CellState } from "./cell";
import styles from './board.module.css';
import { Snake } from "../App";
import { isInclude } from "./utils";

interface BoardProps {
    height: number,
    width: number,
    snake: Snake,
}

export function Board({ height, width, snake }: BoardProps) {
    const board: JSX.Element[][] = [];
    for (let y = 0; y < height; y++) {
        const row: JSX.Element[] = [];
        for (let x = 0; x < width; x++) {
            const cell = [x, y];
            if (isInclude(cell, snake)) row.push(<Cell state={CellState.Snake}></Cell>);
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
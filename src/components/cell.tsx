import styles from './cell.module.css'

interface CellProps {
    state: CellState
};

export enum CellState {
    Empty,
    Snake,
    Food,
};

export function Cell({ state }: CellProps) {
    switch (state) {
        case CellState.Empty:
            return (<div className={styles.cell}>O</div>);
        case CellState.Snake:
            return (<div className={styles.cell}>X</div>);
        case CellState.Food:
            return (<div className={styles.cell}>.</div>);
    }
}
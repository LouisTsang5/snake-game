import './cell.scss'

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
            return (<div className='cell empty'></div>);
        case CellState.Snake:
            return (<div className='cell snake'></div>);
        case CellState.Food:
            return (<div className='cell food'></div>);
    }
}
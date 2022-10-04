import { Direction } from './Direction';
import { Position } from './Position';

export const directionMotions: Record<Direction, (position: Position, distance?: number) => Position> = {
    [Direction.Down]: motion(0, +1),
    [Direction.Up]: motion(0, -1),
    [Direction.Left]: motion(-1, 0),
    [Direction.Right]: motion(+1, 0),
};

function motion(xOffset: number, yOffset: number): (position: Position, distance?: number) => Position {
    return (pos, distance) => (new Position(pos.x + xOffset * (distance ?? 1), pos.y + yOffset * (distance ?? 1)));
}

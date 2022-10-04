import _ from 'lodash';
import { Fluid } from './Items';
import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { UndergroundPipe } from './UndergroundPipe';
import { Direction } from './Direction';
import { Pipe } from './Pipe';

export type PipeLayout = { [position: number]: ('down' | 'up' | 'straight' | 'connect') };

export function layoutPipeLane(connections: number[], obstacles: number[], segmentLength: number): PipeLayout {

    connections = _.sortBy(connections);

    const isObstructed = (pos: number) => _.find(obstacles, i => i === pos);

    let pos = 0;
    const result: PipeLayout = [];
    let nextConnection: number | undefined = 0;
    while (nextConnection < connections.length) {

        if (isObstructed(pos)) {
            throw new Error(`Can't lay a pipe. Position ${ pos } is obstructed.`);
        }

        const c = connections[nextConnection];
        if (c - pos === 1) {
            result[pos] = 'straight';
            pos += 1;
        } else if (pos == c) {
            result[pos] = 'connect';
            ++nextConnection;
            pos += 1;
        } else {
            result[pos] = 'down';
            const downPos = pos;
            pos += Math.min(c - pos - 1, segmentLength - 1);

            // if position following up pipe is obstructed - walk back
            const upPos = pos;
            while (isObstructed(pos) || isObstructed(pos + 1)) {
                --pos;
                if (downPos === pos) {
                    // walked all the way to the down pipe
                    throw new Error(`Can't lay a pipe. Obstacles at the up position ${ upPos }.`);
                }
            }

            result[pos] = 'up';
            pos += 1;
        }
    }
    return result;
}

export type FluidConnection = { fluid: Fluid, position: number };

export function layoutPipes(connections: FluidConnection[], supply: Fluid[]): Fbp {
    const connectionsMap: { [fluid in Fluid]: number[] } = _.chain(connections)
        .groupBy(c => c.fluid)
        .mapValues(c => _.map(c, c2 => c2.position))
        .value() as { [fluid in Fluid]: number[] };

    // start with the last fluid (left-most, index 0)
    let obstacles: number[] = [];
    const fbp = new Fbp('pipes');
    const e = new Editor(fbp);
    for (let fluidIndex in supply) {
        const fluid = supply[fluidIndex];

        const maxRun = 11;
        const fluidConnections = connectionsMap[fluid];
        const pipeLaneLayout: PipeLayout = layoutPipeLane(fluidConnections, obstacles, maxRun);

        type PipeStructure = PipeLayout[number];

        obstacles = [];
        _.forEach(pipeLaneLayout, (structure, key) => {
            const position = Number(key);
            e.moveTo(Number(fluidIndex), position);
            switch (structure as PipeStructure) {
                case 'down':
                    e.add(new UndergroundPipe(), Direction.Up);
                    break;
                case 'up':
                    e.add(new UndergroundPipe(), Direction.Down);
                    break;
                case 'connect':
                    e.add(new Pipe());
                    e.r().add(new UndergroundPipe(), Direction.Left);
                    obstacles.push(position);
                    break;
                case 'straight':
                    e.add(new Pipe());
                    break;
            }
        });
    }

    return fbp;
}

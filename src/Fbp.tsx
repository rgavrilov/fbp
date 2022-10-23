import { Entity } from './Entity';
import { Position } from './Position';
import { Direction } from './Direction';
import { ConnectionPoint } from './ConnectionPoint';
import { Circuit, Network } from './circuit';
import { Fluid } from './Items';
import { UndergroundPipe } from './UndergroundPipe';

export type Element = { position: Position, entity: Entity, direction: Direction };

export type Connections = {
    [C in Circuit]?: { [K in ('red' | 'green')]?: { entity_id: number, circuit_id?: Circuit }[] }
};

export type PipeConnection = { fluid: Fluid, entity: UndergroundPipe };

export type Connection = {
    point1: ConnectionPoint, point2: ConnectionPoint, network: Network
};

export class Fbp {
    exports: { [name: string]: Entity | ConnectionPoint | PipeConnection } = {};
    elements: Element[] = [];
    connections: Connection[] = [];

    constructor(public name: string) {}

    addEntity(position: Position, entity: Entity, direction: Direction) {
        this.elements.push({ entity, position, direction });
    }

    addConnection(network: Network, point1: ConnectionPoint | Entity, point2: ConnectionPoint | Entity) {
        if (point1 == undefined) {
            throw new Error('Point1 of connection is undefined.');
        }
        if (point2 == undefined) {
            throw new Error('Point2 of connection is undefined.');
        }
        if (point1 instanceof Entity) {
            point1 = new ConnectionPoint(point1 as Entity);
        }
        if (point2 instanceof Entity) {
            point2 = new ConnectionPoint(point2 as Entity);
        }
        this.connections.push({ point1, point2, network });
    }

    toString() {
        const elementDescriptions = this.elements.map(element => `@(${ element.position.x }, ${ element.position.y }): ${ element.entity.name }`);
        return [`name: ${ this.name }`, `elements:`, ...elementDescriptions.map(s => '   ' + s)].join('\n');
    }

    addExport(name: string, point: Entity | ConnectionPoint | PipeConnection) {
        this.exports[name] = point;
    }
}

import { Entity } from './Entity';
import { Position } from './Position';
import { Direction } from './Direction';
import { ConnectionPoint } from './ConnectionPoint';
import { Circuit, Network } from './circuit';
import { Fluid } from './Items';
import { UndergroundPipe } from './UndergroundPipe';
import { Dimensions } from './Dimensions';
import _, { forEach } from 'lodash';

export type Element = { position: Position, entity: Entity, direction: Direction };

export type Connections = {
    [C in Circuit]?: { [K in ('red' | 'green')]?: { entity_id: number, circuit_id?: Circuit }[] }
};

export type PipeConnection = { fluid: Fluid, entity: UndergroundPipe };

export type Connection = {
    point1: ConnectionPoint, point2: ConnectionPoint, network: Network
};

export type FbpExports = { [name: string]: Entity | ConnectionPoint | PipeConnection };

export class Fbp {
    exports: FbpExports = {};
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

    rotate(cwQuarterTurns: number) {
        if (cwQuarterTurns === 1) {
            const dimensions = this.getDimensions();
            for (let element of this.elements) {
                element.direction = element.direction === Direction.Left ? Direction.Up : element.direction + 1;
                element.position = new Position(-element.position.y + dimensions.height - 1 -
                    (element.direction === Direction.Up || element.direction === Direction.Down ? element.entity.dimensions.width : element.entity.dimensions.height) + 1,
                    element.position.x);
            }
        }
        else {
            for (let iter = 0; iter < cwQuarterTurns; ++iter) {
                this.rotate(1);
            }
        }
    }

    getDimensions(): Dimensions {
        const minX = _.chain(this.elements).map(e => e.position.x).min().value()!;
        const maxX = _.chain(this.elements)
            .map(e => e.position.x + ((e.direction === Direction.Left || e.direction === Direction.Right)
                ? e.entity.dimensions.height
                : e.entity.dimensions.width))
            .max()
            .value();
        const minY = _.chain(this.elements).map(e => e.position.y).min().value()!;
        const maxY = _.chain(this.elements)
            .map(e => e.position.y + ((e.direction === Direction.Left || e.direction === Direction.Right)
                ? e.entity.dimensions.width
                : e.entity.dimensions.height))
            .max()
            .value()!;
        return new Dimensions(maxX - minX, maxY - minY);
    }
}

import { Entity } from './Entity';
import { Position } from './Position';
import { Direction } from './Direction';
import * as _ from 'lodash';
import { ConnectionPoint } from './ConnectionPoint';
import { Circuit, Network } from './circuit';
import { Fluid } from './Items';
import { UndergroundPipe } from './UndergroundPipe';

export type BluePrintEntity = { id: number, position: Position, entity: Entity, direction: Direction };

export type Connections = {
    [C in Circuit]?: { [K in ('red' | 'green')]?: { entity_id: number, circuit_id?: Circuit }[] }
};

export type PipeConnection = { fluid: Fluid, entity: UndergroundPipe };

export class Fbp {
    constructor(public name: string) {}

    publicConnectionPoints: Record<string, ConnectionPoint> = {};
    publicPoles: Record<string, Entity> = {};

    nextEntityId: number = 1;

    exports: { [name: string]: Entity | ConnectionPoint | PipeConnection } = {};

    elements: BluePrintEntity[] = [];

    getEntityPosition(entity: Entity): (Position | undefined) {
        return _.find(this.elements, e => e.entity === entity)?.position;
    }

    addEntity(position: Position, entity: Entity, direction: Direction) {
        this.elements.push({ entity, position, direction, id: this.nextEntityId++ });
    }

    addPublicPole(name: string, pole: Entity) {
        this.publicPoles[name] = pole;
    }

    addExport(name: string, point: Entity | ConnectionPoint | PipeConnection) {
        this.exports[name] = point;
    }

    connections: {
        point1: ConnectionPoint, point2: ConnectionPoint, network: Network
    }[] = [];

    addConnection(network: Network, point1: ConnectionPoint | Entity, point2: ConnectionPoint | Entity) {
        if (point1 instanceof Entity) {
            point1 = new ConnectionPoint(point1 as Entity);
        }
        if (point2 instanceof Entity) {
            point2 = new ConnectionPoint(point2 as Entity);
        }
        this.connections.push({ point1, point2, network });
    }

    toString() {
        return [
            `name: ${ this.name }`,
            `entities:`,
            ..._.map(this.elements, e => `@(${ e.position.x }, ${ e.position.y }): ${ e.entity.name }`)
                .map(s => '   ' + s),
        ].join('\n');
    }

    addPublicConnectionPoint(name: string, entity: ConnectionPoint) {
        this.publicConnectionPoints[name] = entity;
    }

    electricConnections: [Entity, Entity][] = [];

    addElectricConnection(entity1: Entity, entity2: Entity) {
        this.electricConnections.push([entity1, entity2]);
    }
}

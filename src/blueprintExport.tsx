import { Direction } from './Direction';
import { Position } from './Position';
import { Dimensions } from './Dimensions';
import { ConnectionPoint } from './ConnectionPoint';
import { Circuit, Network } from './circuit';
import * as _ from 'lodash';
import { Entity } from './Entity';
import { Connections, Element, Fbp } from './Fbp';
// @ts-ignore
import * as pako from 'pako';

// 1.16.61
const factorioVersion = 281479275675648;

const DefaultCircuitId: Circuit = '1';

const directionCodeMap = {
    [Direction.Up]: 0, [Direction.Right]: 2, [Direction.Down]: 4, [Direction.Left]: 6,
};

type BPOutputEntity = {
    entity_number: number; name: string; position: { x: number; y: number }; connections?: Connections; direction: number; neighbours?: number[], control_behavior?: any
};

function addElectricalConnection(bpEntity1: BPOutputEntity, bpEntity2: BPOutputEntity) {
    bpEntity1.neighbours ??= [];
    bpEntity1.neighbours.push(bpEntity2.entity_number);
}

function getElementCenter(bpEntity: Element): Position {
    let rotatedDimensions = bpEntity.entity.dimensions;
    if (bpEntity.direction === Direction.Right || bpEntity.direction == Direction.Left) {
        // swap width and height
        rotatedDimensions = new Dimensions(rotatedDimensions.height, rotatedDimensions.width);
    }

    return new Position(bpEntity.position.x + rotatedDimensions.width / 2,
        bpEntity.position.y + rotatedDimensions.height / 2,
    );
}

function addConnectionToEntity(bpOutputEntity: BPOutputEntity,
    sourceCircuit: Circuit | undefined,
    destEntityId: number,
    destCircuit: Circuit | undefined,
    network: Network,
) {
    const networkId = network === Network.Green ? 'green' : 'red';

    const connections = {
        'connections': {
            [sourceCircuit ?? DefaultCircuitId]: {
                [networkId]: [
                    {
                        entity_id: destEntityId,
                        circuit_id: destCircuit !== undefined ? Number(destCircuit) : undefined,
                    },
                ],
            },
        },
    };

    _.mergeWith(bpOutputEntity,
        connections,
        (objValue: any, srcValue: any, key: string, object: any, source: any, stack: { size: number }) => {
            // only merge network-color level
            return stack.size === 2 ? [...(objValue ?? []), ...(srcValue ?? [])] : undefined;
        },
    );
}

export const buildBlueprintExport = (fbp: Fbp) => {
    const entities: any[] = [];

    const output = {
        blueprint: {
            icons: [
                {
                    signal: {
                        type: 'item', name: 'transport-belt',
                    }, index: 1,
                },
            ], entities: entities, item: 'blueprint', version: factorioVersion,
        },
    };

    // assign unique ids for each element
    const elementIds = new Map<Element, number>();
    let entityId: number = 1;
    for (let element of fbp.elements) {
        elementIds.set(element, entityId);
        entityId++;
    }


    const entityToBpEntityMap = new Map<Entity, BPOutputEntity>();
    for (let element of fbp.elements) {
        const entityCenter = getElementCenter(element);
        const bpOutputEntity: BPOutputEntity = {
            'entity_number': elementIds.get(element)!,//
            name: element.entity.name,//
            position: {
                x: entityCenter.x, y: entityCenter.y,
            }, //
            direction: directionCodeMap[element.direction], //
            ...element.entity.getBlueprintOutputAttributes(),
        };

        entityToBpEntityMap.set(element.entity, bpOutputEntity);
        output.blueprint.entities.push(bpOutputEntity);
    }

    // go through each connection and modify appropriate bp entities
    fbp.connections.forEach(c => {
        // forward connection
        // find bp entity for this connection
        const bpEntity1 = entityToBpEntityMap.get(c.point1.entity)!;
        const bpEntity2 = entityToBpEntityMap.get(c.point2.entity)!;
        const network = c.network;

        switch (network) {
            case Network.Red:
            case Network.Green:
                addConnectionToEntity(bpEntity1,
                    c.point1.circuit,
                    bpEntity2.entity_number,
                    c.point2.circuit,
                    c.network,
                );
                addConnectionToEntity(bpEntity2,
                    c.point2.circuit,
                    bpEntity1.entity_number,
                    c.point1.circuit,
                    c.network,
                );
                break;

            case Network.Electric:
                addElectricalConnection(bpEntity1, bpEntity2);
                addElectricalConnection(bpEntity2, bpEntity1);
                break;
        }
    });

    return output;
};

export const getBlueprintExchangeString = (bp: Fbp) => {
    function toExchangeString(input: string) {
        const deflator = new pako.Deflate();
        deflator.push(new TextEncoder().encode(input), true);
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(deflator.result) as any));
        return '0' + base64String;
    }

    return toExchangeString(JSON.stringify(buildBlueprintExport(bp)));
};

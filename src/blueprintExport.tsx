import { Direction } from './Direction';
import { Position } from './Position';
import { Dimensions } from './Dimensions';
import { ConnectionPoint } from './ConnectionPoint';
import { Circuit, Network } from './circuit';
import * as _ from 'lodash';
import { Entity } from './Entity';
import { BluePrintEntity, Connections, Fbp } from './Fbp';
// @ts-ignore
import * as pako from 'pako';

// 1.16.61
const factorioVersion = 281479275675648;

const DefaultCircuitId: Circuit = '1';

export const buildBlueprintExport = (bp: Fbp) => {
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

    type BPOutputEntity = {
        entity_number: number; name: string; position: { x: number; y: number }; connections?: Connections; direction: number; neighbours?: number[], control_behavior?: any
    };

    for (let element of bp.elements) {
        const entityCenter = getElementCenter(element);
        const directionCodeMap = {
            [Direction.Up]: 0, [Direction.Right]: 2, [Direction.Down]: 4, [Direction.Left]: 6,
        };
        const bpOutputEntity: BPOutputEntity = {
            entity_number: element.id, name: element.entity.name, position: {
                x: entityCenter.x, y: entityCenter.y,
            }, direction: directionCodeMap[element.direction], ...element.entity.getBlueprintOutputAttributes(),
        };

        // network connections
        bp.connections.filter(c => c.point1.entity === element.entity).forEach(c => {
            const [source, dest] = [c.point1, c.point2];
            addConnectionToEntity(source.circuit, dest, bpOutputEntity, c.network);
        });
        bp.connections.filter(c => c.point2.entity === element.entity).forEach(c => {
            const [dest, source] = [c.point1, c.point2];
            addConnectionToEntity(source.circuit, dest, bpOutputEntity, c.network);
        });

        // electric connections
        bp.electricConnections.filter(ec => ec[0] === element.entity).forEach(ec => {
            bpOutputEntity.neighbours ??= [];
            bpOutputEntity.neighbours.push(getBPEntityId(ec[1]));
        });
        bp.electricConnections.filter(ec => ec[1] === element.entity).forEach(ec => {
            bpOutputEntity.neighbours ??= [];
            bpOutputEntity.neighbours.push(getBPEntityId(ec[0]));
        });

        output.blueprint.entities.push(bpOutputEntity);
    }

    return output;

    function getElementCenter(bpEntity: BluePrintEntity): Position {
        let rotatedDimensions = bpEntity.entity.dimensions;
        if (bpEntity.direction === Direction.Right || bpEntity.direction == Direction.Left) {
            // swap width and height
            rotatedDimensions = new Dimensions(rotatedDimensions.height, rotatedDimensions.width);
        }

        return new Position(bpEntity.position.x + rotatedDimensions.width / 2,
            bpEntity.position.y + rotatedDimensions.height / 2,
        );
    }

    function addConnectionToEntity(sourceCircuit: Circuit | undefined,
        dest: ConnectionPoint,
        bpOutputEntity: BPOutputEntity,
        network: Network,
    ) {
        const networkId = network === Network.Green ? 'green' : 'red';

        const connections = {
            'connections': {
                [sourceCircuit ?? DefaultCircuitId]: {
                    [networkId]: [
                        { entity_id: getBPEntityId(dest.entity), circuit_id: dest.circuit },
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

    function getBPEntityId(entity: Entity) {
        return bp.elements.find(bpe => bpe.entity === entity)!.id;
    }
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

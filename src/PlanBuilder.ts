import { Fbp } from './Fbp';
import { Entity } from './Entity';
import { Network } from './circuit';
import { Direction } from './Direction';
import { ConnectionPoint } from './ConnectionPoint';
import { Position } from './Position';
import { WoodenChest } from './WoodenChest';
import { StackMap } from './StackMap';


const plan = `
aaU.bbR.
ccD.ddL.
`;

export type Plan = { elements: StackMap<string, { position: Position, direction: Direction }>, markers: Map<string, Position> };

export function loadPlan(plan: string): Plan {
    const lines = plan.split('\n').map(line => line.trim()).filter(line => !!line);
    const elements = new StackMap<string, { position: Position, direction: Direction }>();
    const markers = new Map<string, Position>();
    for (let lineKey in lines) {
        const y = Number(lineKey);
        const line = lines[lineKey];
        const fields = line.split('.').filter(field => !!field);
        for (let fieldKey in fields) {
            const x = Number(fieldKey);
            const field = fields[fieldKey];
            if (!field.match(/^[ \-]*$/)) {

                const isMarker = field[2] === '#';
                if (isMarker) {
                    markers.set(field.substring(0, 2), new Position(x, y));
                } else {
                    const directionMap: Record<string, Direction> = {
                        'D': Direction.Down,
                        'U': Direction.Up,
                        'L': Direction.Left,
                        'R': Direction.Right,
                        ' ': Direction.Down,
                    };
                    const direction = directionMap[field[2]];
                    if (direction === undefined) {
                        throw new Error(`\`${ field[2] }\` is not a recognized direction symbol.`);
                    }
                    const elementId = field.substring(0, 2);
                    elements.add(elementId, { position: new Position(x, y), direction: direction });
                }
            }
        }
    }
    return { elements, markers };
}

export function planToBlueprint(planString: string, //
    entitiesBuilders: Record<string, () => Entity | undefined>, //
    connections: [
        Network, // network
            string | { id: string, circuit: 'input' | 'output' }, // point1
            string | { id: string, circuit: 'input' | 'output' }, // point2
    ][], exports: Record<string, string>,
): Fbp {

    function buildConnection(elements: StackMap<string, { entity: Entity }>,
        connection: string | { id: string; circuit: 'input' | 'output' },
    ): ConnectionPoint | Entity {

        function buildCanonicalConnection(connection: string | { id: string; circuit: 'input' | 'output' }): { id: string; circuit: 'input' | 'output' } {
            if (typeof connection === 'object') {
                return connection;
            } else {
                const parts = connection.split(':');
                if (parts[1] && ['input', 'output'].indexOf(parts[1]) === -1) {
                    throw new Error(`Circuit is specified but is not a valid circuit. Circuit given: '${ parts[1] }'.`);
                }
                return { id: parts[0], circuit: parts[1] as ('input' | 'output') };
            }
        }

        const canonicalConnection: { id: string; circuit: 'input' | 'output' } = buildCanonicalConnection(connection);
        const entity = elements.get(canonicalConnection.id).entity;
        let point: ConnectionPoint | undefined = undefined;
        if (canonicalConnection.circuit) {
            point = (entity as any)[canonicalConnection.circuit];
            if (point === undefined) {
                throw new Error(`Circuit ${ canonicalConnection.circuit } is not defined on entity: ${ JSON.stringify(
                    entity) }.`);
            }
        }

        return point ?? entity;
    }

    const plan: Plan = loadPlan(planString);

    const fbp = new Fbp('result');
    // Note: entity ids are not guaranteed to be unique. We can have a stretch of transport belts, for example.
    const planElements = new StackMap<string, { entity: Entity; position: Position; direction: Direction }>();
    for (let [id, element] of plan.elements) {
        if (entitiesBuilders[id] === undefined) {
            // FDO: throw new Error(`No entity builder provided for element with id: ${ id }.`);
            console.warn(`No entity builder provided for element with id: ${ id }.`);
        }

        // default to wooden chest
        const entity = entitiesBuilders?.[id]?.();
        if (entity !== undefined) {
            planElements.add(id, { entity: entity, position: element.position, direction: element.direction });
            fbp.addEntity(element.position, entity, element.direction);
        }
    }

    for (let connection of connections) {
        const network = connection[0];
        fbp.addConnection(network,
            buildConnection(planElements, connection[1]),
            buildConnection(planElements, connection[2]),
        );
    }

    for (let expName in exports) {
        let id = exports[expName];
        const planElement = planElements.get(id);
        if (planElement === undefined) {
            throw new Error(`Plan element with id ${ id } doesn't exist.`);
        }
        fbp.addExport(expName, planElement.entity);
    }

    return fbp;
}

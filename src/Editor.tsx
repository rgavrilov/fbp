import { Fbp } from './Fbp';
import { Position } from './Position';
import { Entity } from './Entity';
import { Direction } from './Direction';
import { directionMotions } from './DirectionMotions';
import * as _ from 'lodash';
import { Plan } from './PlanBuilder';

export class Editor {
    constructor(public fbp: Fbp, public cursor: Position = Position.O) {
    }

    add(entity: Entity, direction: Direction = Direction.Up) {
        this.addAtPosition(entity, direction, this.cursor);
        return new Editor(this.fbp, this.cursor);
    }

    addAtPosition(entity: Entity, direction: Direction, position: Position, elementName?: string) {
        const existingEntity = this.findEntityAt(position);
        if (!!existingEntity) {
            throw new Error(`Collision at ${ this.cursor.toString() }. Trying to add: ${ entity.name }.`);
        }
        this.fbp.addEntity(position, entity, direction);
    }

    move(dir: Direction, distance: number = 1) {
        this.cursor = directionMotions[dir](this.cursor, distance);
    }

    public findEntityAt(position: Position): (Entity | undefined) {
        return _.find(this.fbp.elements, (e) => position.inBox(e.position, e.entity.dimensions))?.entity;
    }

    moveToWithPlan(id: string, plan: Plan) {
        this.moveTo(plan.elements.get(id)!.position);
    }

    moveTo(x: Position): this;
    moveTo(x: number, y: number): this;
    moveTo(x: number | Position, y?: number): this {
        if (typeof x === 'number') {
            this.cursor = new Position(x, y!);
        } else {
            this.cursor = new Position(x.x, x.y);
        }
        return this;
    }

    r(distance: number = 1): this {
        this.move(Direction.Right, distance);
        return this;
    }

    l(distance: number = 1): this {
        this.move(Direction.Left, distance);
        return this;
    }

    u(distance: number = 1): this {
        this.move(Direction.Up, distance);
        return this;
    }

    d(distance: number = 1): this {
        this.move(Direction.Down, distance);
        return this;
    }

    addBlueprint(childBP: Fbp) {
        // when adding a child blueprint
        // should add every entity as a new entity (using relative position)
        childBP.elements.forEach(childBPEntity => {
            const relativePosition = this.cursor.add(childBPEntity.position);
            this.fbp.addEntity(relativePosition, childBPEntity.entity, childBPEntity.direction);
        });

        this.fbp.connections.push(...childBP.connections);
    }

    addLine(entityBuilder: () => Entity, direction: Direction, count: number) {
        for (let i = 0; i < count; ++i) {
            this.add(entityBuilder(), direction);
            if (i !== count - 1) {
                this.move(direction);
            }
        }
        return this;
    }

    remove(x: number, y: number) {
        _.remove(this.fbp.elements, e => e.position.x === x && e.position.y === y);
        this.moveTo(x, y)
        return this;
    }
}

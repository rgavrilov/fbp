import { Entity } from './Entity';
import { Circuit } from './circuit';

export class ConnectionPoint {
    constructor(public entity: Entity, public circuit?: Circuit) {}
}
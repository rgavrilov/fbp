import { FactorioRecipeName } from '../recipesExport';
import { block } from './factory';

export const laserTurretsFactory: FactorioRecipeName[] = [
    'sulfur',
    'sulfuric-acid',
    'copper-cable',
    'electronic-circuit',
    ...block( 'battery', { repeat: 3 }),
    'laser-turret',
];

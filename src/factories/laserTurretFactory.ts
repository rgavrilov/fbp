import { FactorioRecipeName } from '../recipesExport';
import { repeat } from './repeat';

export const laserTurretsFactory: FactorioRecipeName[] = [
    'sulfur', 'sulfuric-acid', 'copper-cable', 'electronic-circuit', ...repeat('battery', 3), 'laser-turret',
];

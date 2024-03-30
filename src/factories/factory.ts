import { FactorioRecipeName } from '../recipesExport';
import _ from 'lodash';
import { SupplyBeltMap } from '../supplySegment';

export type Segment = 'nuclear' | 'blue-belts' | 'networks';

export const reserve: FactorioRecipeName = 'wooden-chest';

export const repeat = (recipe: FactorioRecipeName, times: number) => _.map(Array(times), () => (() => recipe)());

export const block = (
    recipe: FactorioRecipeName,
    options?: { repeat?: number, segment?: Segment },
    segments?: Segment[]
) => {
    if (options?.segment && !segments?.includes(options.segment)) {
        return [reserve];
    }

    return options?.repeat !== undefined ? repeat(recipe, options.repeat) : [recipe];
};

export type FactoryBlockSpec = {
    recipe: FactorioRecipeName,
    ingredientsMultiplier?: number,
    stockpileIngredientsForContinuousProduction?: boolean,
    productLimit: number,
};

export type FactoryLayout = {
    supplyBeltMap: SupplyBeltMap,
    factorySequence: (FactorioRecipeName | FactoryBlockSpec)[],
};
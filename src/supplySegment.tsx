import { Editor } from './Editor';
import { Recipe } from './Recipe';
import _ from 'lodash';
import { Fluid, fluids, Item } from './Items';
import { Splitter } from './Splitter';
import { Direction } from './Direction';
import { UndergroundBelt } from './UndergroundBelt';
import { FastInserter, LongHandedInserter } from './inserters';
import { UndergroundPipe } from './UndergroundPipe';

export type SupplyBeltMap = Partial<Record<Item | Fluid, number>>;

function useNextAvailableSpot(availableSpots: Record<string, boolean>): number {
    const availableSpot = Number(_.findKey(availableSpots, spot => spot));
    if (isNaN(availableSpot)) {
        throw new Error('No available spots.');
    }
    availableSpots[availableSpot] = false;
    return availableSpot;
}

export function buildSupplySegment(e: Editor, recipe: Recipe, supplyBelt: SupplyBeltMap) {
    const ingredients = _.keys(recipe.ingredients) as (Item | Fluid)[];

    // figure out which ingredient inserts to use
    const ingredientBelts = _.chain(ingredients).map(i => supplyBelt[i]).filter(v => v !== undefined).uniq().value();

    const availableSpots: Record<string, boolean> = { 1: true, 2: true, 3: true };

    // need to reach 3rd belt. Need to break the first belt to put long-handed inserter.
    if (_.includes(ingredientBelts, 3)) {
        e.remove(0, 1);
        e.remove(1, 1);
        e.remove(1, 0);
        e.remove(1, 2);
        // add splitter
        e.moveTo(0, 1).add(new Splitter(), Direction.Down);
        // add underground belt
        e
            .moveTo(1, 0)
            .add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down)
            .moveTo(1, 2)
            .add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
        e.moveTo(3, 1).add(new LongHandedInserter(), Direction.Left);
        // this inserter can only go to the second spot to align with splitter
        availableSpots[2] = false;
    }

    // handle fluids
    const fluidIngredients = _.intersection(fluids, ingredients) as Fluid[];
    if (recipe.equipment === 'assembling-machine' && fluidIngredients.length > 0) {
        // add pipe
        e.moveTo(3, 1);
        const undergroundPipe = new UndergroundPipe();
        e.add(undergroundPipe, Direction.Right);
        // assembly machine with fluid has fixed pipe position
        availableSpots[2] = false;
        e.fbp.addExport('pipe1', { fluid: fluidIngredients[0], entity: undergroundPipe });
    } else if (recipe.equipment === 'chemical-plant') {

        const fluidPositions: { [item in (Item | Fluid)]?: ([Fluid] | [Fluid, Fluid]) } = {
            'sulfur': ['petroleum-gas', 'water'],
            'battery': ['sulfuric-acid'],
            'plastic-bar': ['petroleum-gas'],
            'explosives': ['water'],
            'solid-fuel': ['light-oil'],
            'sulfuric-acid': ['water'],
        };
        const recipeFluids = fluidPositions[recipe.item]!;

        if (recipeFluids.length >= 1) {
            e.moveTo(3, 0);
            const chemicalPlantPipe1 = new UndergroundPipe();
            e.add(chemicalPlantPipe1, Direction.Right);
            e.fbp.addExport('pipe1', { fluid: recipeFluids[0], entity: chemicalPlantPipe1 });
            availableSpots[1] = false;
        }
        if (recipeFluids.length >= 2) {
            e.d().d();
            const chemicalPlantPipe2 = new UndergroundPipe();
            e.add(chemicalPlantPipe2, Direction.Right);
            e.fbp.addExport('pipe2', { fluid: recipeFluids[1], entity: chemicalPlantPipe2 });
            availableSpots[3] = false;
        }
    }

    if (_.includes(ingredientBelts, 2)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(3, spot - 1).add(new LongHandedInserter(), Direction.Left);
    }

    if (_.includes(ingredientBelts, 1)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(3, spot - 1).add(new FastInserter(), Direction.Left);
    }

    // if product goes back on the supply belt (as is the case for electronic-circuit) then add put-extractors
    const productBelt = supplyBelt[recipe.item];
    if (productBelt) {
        const inserter = productBelt === 1 ? new FastInserter() : new LongHandedInserter();
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(3, spot - 1).add(inserter, Direction.Right);
    }
}

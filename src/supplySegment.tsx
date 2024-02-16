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

function useNextAvailableSpot(availableSpots: Record<string, boolean>, acceptableSpots?: number[]): number {
    const availableSpot = Number(_.findKey(
        availableSpots,
        (isAvailable, position) => isAvailable &&
            (acceptableSpots === undefined || _.includes(acceptableSpots, Number(position))),
    ));
    if (isNaN(availableSpot)) {
        throw new Error('No available spots.');
    }
    availableSpots[availableSpot] = false;
    return availableSpot;
}

export function buildSupplySegment(e: Editor, recipe: Recipe, supplyBelt: SupplyBeltMap) {
    const ingredients = _.keys(recipe.ingredients) as (Item | Fluid)[];

    // figure out belts to access
    const ingredientBelts = _.chain(ingredients).map(i => supplyBelt[i]).filter(v => v !== undefined).uniq().value();

    const availableSpots: Record<string, boolean> = { 1: true, 2: true, 3: true };

    if (_.includes(ingredientBelts, 4)) {
        // put splitter
        e.remove(0, 1);
        e.remove(1, 1);
        e.moveTo(0, 1).add(new Splitter(), Direction.Down);
        // add underground belts around splitter
        e.remove(1, 0).add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down);
        e.remove(1, 2).add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
        // add inserter and underground belts around it 
        e.remove(3, 0).add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down);
        e.remove(3, 1).add(new LongHandedInserter(), Direction.Left);
        e.remove(3, 2);
        e.remove(3, 3).add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
    }

    if (_.includes(ingredientBelts, 3)) {
        // this modification has been already done if we need access to 4th belt
        if (!_.includes(ingredientBelts, 4)) {
            e.remove(3, 0).add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down);
            e.remove(3, 1);
            e.remove(3, 2);
            e.remove(3, 3).add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
        }
        e.moveTo(3, 2).add(new LongHandedInserter(), Direction.Left);
    }

    // handle fluids
    const fluidIngredients = _.intersection(fluids, ingredients) as Fluid[];
    if (recipe.equipment === 'assembling-machine' && fluidIngredients.length > 0) {
        // add pipe
        e.moveTo(4, 1);
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
            e.moveTo(4, 0);
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

    if (_.includes(ingredientBelts, 1)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(4, spot - 1).add(new FastInserter(), Direction.Left);
    }

    if (_.includes(ingredientBelts, 2)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(4, spot - 1).add(new LongHandedInserter(), Direction.Left);
    }

    // if product goes back on the supply belt (as is the case for electronic-circuit) then add put-extractors
    const productBelt = supplyBelt[recipe.item];
    if (productBelt) {
        switch (productBelt) {
            case 1:
                e.moveTo(4, useNextAvailableSpot(availableSpots) - 1).add(new FastInserter(), Direction.Right);
                break;
            case 2:
                e.moveTo(4, useNextAvailableSpot(availableSpots) - 1).add(new LongHandedInserter(), Direction.Right);
                break;
            case 3:
                // 3rd belt is only accessible from 2nd position.
                const allowedPositions = [2];
                e.moveTo(4, useNextAvailableSpot(availableSpots, allowedPositions) - 1)
                    .add(new LongHandedInserter(), Direction.Right);
                e.remove(2, 0).add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down);
                e.remove(2, 1);
                e.remove(1, 1).add(new Splitter(), Direction.Down);
                e.remove(2, 2).add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
                break;
            case 4:
                throw new Error('Not supporting putting products on 4th belt.');
        }
    }
}

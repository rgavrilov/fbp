import { Recipe } from '../../Recipe';
import { SupplyBeltMap } from '../../supplySegment';
import { EntityBuilders } from '../../PlanBuilder';
import { FbpExports, PipeConnection } from '../../Fbp';
import _ from 'lodash';
import { TransportBelt } from '../../transportBelts';
import { FastInserter, LongHandedInserter } from '../../inserters';
import { Fluid, fluids, Item } from '../../Items';
import { UndergroundBelt } from '../../UndergroundBelt';
import { UndergroundPipe } from '../../UndergroundPipe';
import { Entity } from 'src/Entity';

function verifySulfuricAcidIsAlwaysBeforeWater(neededFluids: Fluid[]) {
    if (neededFluids.includes('sulfuric-acid') && neededFluids.includes('water')) {
        if (neededFluids.indexOf('sulfuric-acid') > neededFluids.indexOf('water')) {
            throw new Error('When using sulfuric acid and water, the sulfuric acid must come first.');
        }
    }
}

export function buildSupplyBlock(recipe: Recipe, supplyBeltMap: SupplyBeltMap): [EntityBuilders, FbpExports] {

    // figure out which transport belts are needed
    const neededIngredients = _.chain(recipe.ingredients).keys();
    const neededBelts = neededIngredients
        .map(i => supplyBeltMap[i as Item]).reject(lane => lane === undefined)
        .uniq().value();
    const neededFluids = _.intersection(neededIngredients.value(), fluids) as Fluid[];

    // the only recipe that has 2 fluid inputs is sulfuric acid,
    // in which case petroleum input is top and water is bottom (when inputs are on the left).
    verifySulfuricAcidIsAlwaysBeforeWater(neededFluids);

    let pipesConnections: Partial<Record<'pipe1' | 'pipe2', PipeConnection>> = {};
    let pipeRow: {
        m1: () => Entity | undefined; // 
        m2: () => Entity | undefined; //
        m3: () => Entity | undefined
    } = {
        m1: () => undefined, m2: () => undefined, m3: () => undefined,
    };
    switch (recipe.equipment) {
        case 'assembling-machine':
            if (neededFluids.length > 1) {
                throw new Error('More than one fluid needed');
            }
            if (neededFluids.length === 1) {
                pipesConnections.pipe1 = { fluid: neededFluids[0], entity: new UndergroundPipe() };
            }
            pipeRow = {
                m1: () => neededBelts.includes(2) ? new LongHandedInserter() : undefined,
                m2: () => pipesConnections.pipe1?.entity,
                m3: () => neededBelts.includes(1) ? new FastInserter() : undefined,
            };
            break;
        case 'chemical-plant':
            if (neededFluids.length > 2) {
                throw new Error('More than two fluids needed');
            }

            if (neededFluids.length + neededBelts.length > 3) {
                throw new Error('Can not have more than three inputs (fluids or items).');
            }

            if (neededFluids.length >= 1) {
                const pipe1 = new UndergroundPipe();
                pipesConnections.pipe1 = {
                    fluid: neededFluids[0], entity: pipe1,
                };
                pipeRow.m1 = () => pipe1;
                pipeRow.m2 = () => neededBelts.includes(2) ? new LongHandedInserter() : undefined;
                pipeRow.m3 = () => neededBelts.includes(1) ? new FastInserter() : undefined;
            }
            if (neededFluids.length === 2) {
                const pipe2 = new UndergroundPipe();
                pipesConnections.pipe2 = {
                    fluid: neededFluids[0], entity: pipe2,
                };
                pipeRow.m2 =
                    () => neededBelts.includes(2) ? new LongHandedInserter() : neededBelts.includes(1)
                        ? new FastInserter()
                        : undefined;
                pipeRow.m3 = () => pipe2;
            }
            break;
        default:
            pipeRow = {
                m1: () => neededBelts.includes(2) ? new LongHandedInserter() : undefined,
                m2: () => undefined,
                m3: () => neededBelts.includes(1) ? new FastInserter() : undefined,
            };
    }

    return [
        {
            b1: () => neededBelts.includes(3) ? new UndergroundBelt({ beltDirection: 'output' }) : new TransportBelt(),
            b2: () => neededBelts.includes(3) ? new LongHandedInserter() : new TransportBelt(),
            b3: () => neededBelts.includes(3)
                ? new UndergroundBelt({ beltDirection: 'input' })
                : new TransportBelt(), ...pipeRow,
        }, pipesConnections,
    ];
}

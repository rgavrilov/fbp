import { describe, expect, it } from '@jest/globals';
import { buildSupplyBlock } from '../../src/factories/ratedFactory/buildSupplyBlock';
import _ from 'lodash';
import { Recipe, recipes } from '../../src/Recipe';
import { Fluid, Item } from '../../src/Items';
import { EntityBuilders } from '../../src/PlanBuilder';
import { FbpExports, PipeConnection } from '../../src/Fbp';
import {
    compileBlockSpecs, BlockSpec, computeRatedSequence, buildRatedFactory,
} from '../../src/factories/ratedFactory/ratedFactory';


const supplyBeltMap = {
    'iron-ore': 1, 'copper-ore': 2, 'iron-plate': 3, 'copper-plate': 4, 'steel-plate': 5, 'copper-cable': 6,
};

const assemblyMachineRecipe: (ingredients: (Item | Fluid)[]) => Recipe = (items) => ({
    equipment: 'assembling-machine', // 
    ingredients: _.chain(items).keyBy().mapValues(() => 1).value(), // 
    item: 'wooden-chest', //
    craftingTime: 1, //
    output: 1,
});

const chemicalPlantRecipe: (ingredients: (Item | Fluid)[]) => Recipe = (items) => ({
    equipment: 'chemical-plant', // 
    ingredients: _.chain(items).keyBy().mapValues(() => 1).value(), // 
    item: 'wooden-chest', //
    craftingTime: 1, //
    output: 1,
});

function expectBuilders(builders: EntityBuilders, expectedEntities: (Item | '' | '*')[]) {
    const actual = _.chain(['m1', 'm2', 'm3', 'b1', 'b2', 'b3'])
        .map((position, index) => expectedEntities[index] === '*' ? '*' : builders[position]?.()?.name ?? '')
        .value();
    expect(actual).toEqual(expectedEntities);
}

function expectExportPipe(exports: FbpExports, expectedConnections: Record<string, Fluid>) {
    for (const connectionName in expectedConnections) {
        expect(exports[connectionName]).toBeDefined();
        const connection = exports[connectionName] as PipeConnection;
        expect(connection.fluid).toBe(expectedConnections[connectionName]);
        expect(connection.entity.name).toBe('pipe-to-ground');
    }
}

describe('buildSupplyBlock', () => {
    describe('dry recipe', () => {
        it('should stay empty if no raw materials are needed', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe([]), supplyBeltMap);
            expect(exports).toEqual({});
            expectBuilders(builders, ['', '', '', 'transport-belt', 'transport-belt', 'transport-belt']);
        });

        it('consumes ingredients from the first belt', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe(['iron-ore']), supplyBeltMap);
            expect(exports).toEqual({});
            expectBuilders(builders, ['', '', 'fast-inserter', 'transport-belt', 'transport-belt', 'transport-belt']);
        });

        it('consumes ingredients from the second belt', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe(['iron-plate']), supplyBeltMap);
            expect(exports).toEqual({});
            expectBuilders(builders,
                ['long-handed-inserter', '', '', 'transport-belt', 'transport-belt', 'transport-belt'],
            );
        });

        it('consumes ingredients from the third belt', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe(['steel-plate']), supplyBeltMap);
            expect(exports).toEqual({});
            expectBuilders(builders, ['', '', '', 'underground-belt', 'long-handed-inserter', 'underground-belt']);
        });

        it('consumes ingredients from all three belts', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe([
                'steel-plate', 'iron-plate', 'iron-ore',
            ]), supplyBeltMap);
            expect(exports).toEqual({});
            expectBuilders(builders, [
                'long-handed-inserter',
                '',
                'fast-inserter',
                'underground-belt',
                'long-handed-inserter',
                'underground-belt',
            ]);
        });
    });
    describe('wet recipe', () => {
        it('consumes fluid', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe(['petroleum-gas']), supplyBeltMap);
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders, ['', 'pipe-to-ground', '', 'transport-belt', 'transport-belt', 'transport-belt']);
        });

        it('fluid + all three belts', () => {
            const [builders, exports] = buildSupplyBlock(assemblyMachineRecipe([
                'petroleum-gas', 'steel-plate', 'iron-plate', 'iron-ore',
            ]), supplyBeltMap);
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders, [
                'long-handed-inserter',
                'pipe-to-ground',
                'fast-inserter',
                'underground-belt',
                'long-handed-inserter',
                'underground-belt',
            ]);
        });
    });
    describe('chemical plant recipe', () => {
        it('1 pipe', () => {
            const [builders, exports] = buildSupplyBlock(chemicalPlantRecipe(['petroleum-gas']), supplyBeltMap);
            expectBuilders(builders, ['*', '', '*', 'transport-belt', 'transport-belt', 'transport-belt']);
            expect(builders['m1']?.()?.name === 'pipe-to-ground' || builders['m3']?.()?.name === 'pipe-to-ground')
                .toBe(true);
        });
        it('1 pipe + first belt ingredient', () => {
            const [builders, exports] = buildSupplyBlock(chemicalPlantRecipe(['petroleum-gas', 'iron-ore']),
                supplyBeltMap,
            );
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders,
                ['pipe-to-ground', '', 'fast-inserter', 'transport-belt', 'transport-belt', 'transport-belt'],
            );
        });

        it('1 pipe + first and third belt ingredients', () => {
            const [builders, exports] = buildSupplyBlock(chemicalPlantRecipe([
                'petroleum-gas', 'iron-ore', 'steel-plate',
            ]), supplyBeltMap);
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders,
                ['pipe-to-ground', '', 'fast-inserter', 'underground-belt', 'long-handed-inserter', 'underground-belt'],
            );
        });

        it('2 pipes + third belt ingredient', () => {
            const [builders, exports] = buildSupplyBlock(chemicalPlantRecipe([
                'petroleum-gas', 'water', 'steel-plate',
            ]), supplyBeltMap);
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders, [
                'pipe-to-ground', '', 'pipe-to-ground', 'underground-belt', 'long-handed-inserter', 'underground-belt',
            ]);
        });

        it('2 pipes + first belt ingredient', () => {
            const [builders, exports] = buildSupplyBlock(chemicalPlantRecipe([
                'petroleum-gas', 'water', 'iron-ore',
            ]), supplyBeltMap);
            expectExportPipe(exports, { pipe1: 'petroleum-gas' });
            expectBuilders(builders, [
                'pipe-to-ground',
                'fast-inserter',
                'pipe-to-ground',
                'transport-belt',
                'transport-belt',
                'transport-belt',
            ]);
        });
    });
});

// describe('computeRatedSequence', () => {
//     const sequence = computeRatedSequence(
//         [{ item: 'productivity-module-speed-1', rate: 2 }],
//         ['iron-plate', 'copper-plate', 'plastic-bar']
//     );
// });

describe('compactBlockList', () => {
    it('nothing to consolidate', () => {
        const result = compactBlockList([
            { recipe: recipes['copper-cable']!, outputRate: 2 }, { recipe: recipes['copper-plate']!, outputRate: 2 },
        ]);
        expect(result).toMatchObject([
            { recipe: { item: 'copper-cable' }, outputRate: 2 }, { recipe: { item: 'copper-plate' }, outputRate: 2 },
        ]);
    });
    it('consolidates blocks', () => {
        const result = compactBlockList([
            { recipe: recipes['copper-cable']!, outputRate: 2 }, { recipe: recipes['copper-cable']!, outputRate: 2 },
        ]);
        expect(result).toMatchObject([{ recipe: { item: 'copper-cable' }, outputRate: 4 }]);
    });
    it('removes 0-utilization blocks', () => {
        const result = compactBlockList([
            { recipe: recipes['copper-cable']!, outputRate: 0 },
        ]);
        expect(result).toMatchObject([]);
    });
});

describe('compileBlockSpecs', () => {
    function testCase(input: [Item, number][], expectedOutput: [Item, number | undefined, BlockSpec['features']][]) {
        const specs = compileBlockSpecs(_.map(input, i => ({ recipe: recipes[i[0]]!, outputRate: i[1] })),
            { 'copper-plate': 1 },
        );

        expect(specs.map(s => [s.recipe.item, s.outputRate, s.features])).toEqual(expectedOutput);
    }

    it('single block', () => {
        testCase([
            ['copper-cable', 1],
        ], [
            ['copper-cable', 1, { output: true, recycler: true }],
        ]);
    });

    it('2-block cluster', () => {
        testCase([
            ['copper-cable', 1], ['copper-cable', 1],
        ], [
            ['copper-cable', undefined, { downstreamConnection: true, recycler: true }],
            ['copper-cable', 2, { upstreamConnection: true, output: true }],
        ]);
    });

    it('3-block cluster', () => {
        testCase([
            ['copper-cable', 1], ['copper-cable', 1], ['copper-cable', 1],
        ], [
            ['copper-cable', undefined, { downstreamConnection: true, recycler: true }],
            ['copper-cable', undefined, { upstreamConnection: true, downstreamConnection: true }],
            ['copper-cable', 3, { upstreamConnection: true, output: true }],
        ]);
    });

    it('first block gets recycler', () => {
        testCase([
            ['copper-cable', 1],
        ], [
            ['copper-cable', 1, { recycler: true, output: true }],
        ]);
    });

    it('recycler is limited to one per recipe', () => {
        testCase([
            ['copper-cable', 1], ['iron-gear-wheel', 1], ['copper-cable', 1],
        ], [
            ['copper-cable', 1, { recycler: true, output: true }],
            ['iron-gear-wheel', 1, { recycler: true, output: true }],
            ['copper-cable', 1, { output: true }],
        ]);
    });

    it('buffer is only used when recipe needs materials off the loop', () => {
        testCase([
            ['copper-cable', 1], // doesn't need buffer
            ['electronic-circuit', 1], // needs buffer
        ], [
            ['copper-cable', 1, { recycler: true, output: true }],
            ['electronic-circuit', 1, { recycler: true, output: true, buffer: true }],
        ]);
    });
});

describe('computeRatedSequence', () => {
    it('electronic-circuit @ 2', () => {
        const blocks = computeRatedSequence([{ item: 'electronic-circuit', outputRate: 2 }],
            ['iron-plate', 'copper-plate'],
            0.5,
        );
        const formattedBlocks = _.map(blocks,
            b => `${ b.recipe.item } ${ b.outputRate ?? '-' } (${ _.keys(b.features).join(', ') })`,
        );
        console.log(formattedBlocks.join('\n'));
    });
    it('advanced-circuit @ 0.125', () => {
        const blocks = computeRatedSequence([{ item: 'advanced-circuit', outputRate: 0.125 }],
            ['iron-plate', 'copper-plate', 'coal'],
            0.75,
        );
        const formattedBlocks = _.map(blocks,
            b => `${ b.recipe.item } ${ b.outputRate ?? '-' } (${ _.keys(b.features).join(', ') })`,
        );
        const actualOutput = formattedBlocks.join('\n');

        const expectedOutput = `
            copper-cable 1.6 (recycler, output)
            electronic-circuit 0.4 (recycler, output, buffer)
            plastic-bar 0.4 (recycler, output, buffer)
            advanced-circuit - (recycler, downstreamConnection, buffer)
            advanced-circuit 0.2 (upstreamConnection, output, buffer)
            wooden-chest 1 (recycler, output, buffer)
        `.replace(/^\s+/gm, '').replace(/^\s*\n/, '').replace(/\n\s*$/, '');

        console.log(actualOutput);
        expect(actualOutput).toBe(expectedOutput);
    });
    it('advanced-circuit @ 0.25', () => {
        const blocks = computeRatedSequence([{ item: 'advanced-circuit', outputRate: 0.25 }],
            ['iron-plate', 'copper-plate', 'coal'],
            0.75,
        );
        const formattedBlocks = _.map(blocks,
            b => `${ b.recipe.item } ${ b.outputRate ?? '-' } (${ _.keys(b.features).join(', ') })`,
        );
        const actualOutput = formattedBlocks.join('\n');

        const expectedOutput = `
            copper-cable 2.5 (recycler, output)
            electronic-circuit 0.5 (recycler, output, buffer)
            plastic-bar 0.5 (recycler, output, buffer)
            advanced-circuit - (recycler, downstreamConnection, buffer)
            advanced-circuit 0.25 (upstreamConnection, output, buffer)
            wooden-chest 1 (recycler, output, buffer)
        `.replace(/^\s+/gm, '').replace(/^\s*\n/, '').replace(/\n\s*$/, '');

        console.log(actualOutput);
        expect(actualOutput).toBe(expectedOutput);
    });
});

describe('buildRatedFactory doesn\'t throw exception', () => {
    it('electronic-circuit @ 5.5', () => {
        const factory = buildRatedFactory([
            { item: 'electronic-circuit', outputRate: 5.5 },
        ], {
            'iron-plate': 1, //
            'copper-plate': 1, //
            'steel-plate': 2, //
            // 'electronic-circuit': 2, //
            'stone': 3, //
            'coal': 3, //
        });
    });
    it('advanced-circuit @ 0.2', () => {
        const factory = buildRatedFactory([
            { item: 'advanced-circuit', outputRate: 0.2 },
        ], {
            'iron-plate': 1, //
            'copper-plate': 1, //
            'steel-plate': 2, //
            // 'electronic-circuit': 2, //
            'stone': 3, //
            'coal': 3, //
        });
    });
});
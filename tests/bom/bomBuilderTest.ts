import { expect, test } from '@jest/globals';
import { buildBom, printTree, traverseTreeChildFirst } from '../../src/bom/bomBuilder';
import { recipes } from '../../src/Recipe';

test('build bom graph', () => {
    const actualTree = buildBom(recipes['productivity-module']!,
        1,
        ['iron-plate', 'copper-plate', 'coal', 'petroleum-gas'],
    );
    const renderedActualTree = printTree(actualTree, value => `${ value.recipe.item } : ${ value.outputRate.toFixed(2) }`);

    const expected = `productivity-module : 1.00
  advanced-circuit : 5.00
    electronic-circuit : 10.00
      copper-cable : 30.00
    plastic-bar : 10.00
    copper-cable : 20.00
  electronic-circuit : 5.00
    copper-cable : 15.00
`;

    expect(renderedActualTree).toEqual(expected);
});

test('traverse nodes', () => {
    const actualTree = buildBom(recipes['productivity-module']!,
        1,
        ['iron-plate', 'copper-plate', 'coal', 'petroleum-gas'],
    );

    const nodes: string[] = [];
    traverseTreeChildFirst(actualTree, value => {
        nodes.push(value.recipe.item);
    });

    expect(nodes).toEqual([
        'copper-cable',
        'electronic-circuit',
        'plastic-bar',
        'copper-cable',
        'advanced-circuit',
        'copper-cable',
        'electronic-circuit',
        'productivity-module',
    ]);
});
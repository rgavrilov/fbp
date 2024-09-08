import { Block } from './factories/ratedFactory/ratedFactory';

export const ratedFactorySequence = {
    supplyBeltMap: {
        'iron-plate': 1, //
        'copper-plate': 1, //
        'steel-plate': 2, //
        'coal': 2, //
        'stone': 3, //
        // 'advanced-circuit': 3, //
    }, // 
    factorySequence: [
        {
            recipe: 'iron-gear-wheel', outputRate: 1,
        }, {
            recipe: 'pipe', outputRate: 2,
        }, {
            recipe: 'engine-unit', outputRate: 1,
        }, {
            recipe: 'copper-cable', outputRate: 23,
        }, {
            recipe: 'electronic-circuit', outputRate: 7,
        }, {
            recipe: 'battery', outputRate: 2,
        }, {
            recipe: 'electric-engine-unit', outputRate: 1,
        }, {
            recipe: 'flying-robot-frame', outputRate: 0,
        }, {
            recipe: 'flying-robot-frame', outputRate: 1,
        }, {
            recipe: 'construction-robot', outputRate: 1,
        },
    ] as Block[],

};

import { RatedFactoryBlock } from './factories/ratedFactory/ratedFactory';

export const allSciencePacksFactory = {
    supplyBeltMap: {
        'iron-plate': 1, //
        'copper-plate': 1, //
        'steel-plate': 2, //
        'electronic-circuit': 2, //
        'stone': 3, //
        'coal': 3, //
        // 'advanced-circuit': 3, //
    }, // 
    factorySequence: [
        // @formatter:off
        { item: 'automation-science-pack', outputRate: 0.24 },
        { item: 'logistic-science-pack', outputRate: 0.24 },
        { item: 'inserter', outputRate: 0.24 },
        { item: 'transport-belt', outputRate: 0.24 },
        { item: 'military-science-pack', outputRate: 0.24 },
        { item: 'firearm-magazine', outputRate: 0.12 },
        { item: 'piercing-rounds-magazine', outputRate: 0.12 },
        { item: 'grenade', outputRate: 0.12 },
        { item: 'stone-wall', outputRate: 0.12 },
        { item: 'chemical-science-pack', outputRate: 0.24 },
        { item: 'production-science-pack', outputRate: 0.24 },
        { item: 'electric-furnace', outputRate: 0.08 },
        { item: 'stone-brick', outputRate: 2 },
        { item: 'productivity-module', outputRate: 0.08 },
        { item: 'rail', outputRate: 2.4 },
        { item: 'iron-stick', outputRate: 1.2 },
        { item: 'utility-science-pack', outputRate: 0.24 },
        { item: 'low-density-structure', outputRate: 0.24 },
        { item: 'processing-unit', outputRate: 0.16 },
        { item: 'advanced-circuit', outputRate: 1.48 },
        { item: 'plastic-bar', outputRate: 4.16 },
        { item: 'copper-cable', outputRate: 5.92 },
        { item: 'flying-robot-frame', outputRate: 0.08 },
        { item: 'electric-engine-unit', outputRate: 0.08 },
        { item: 'engine-unit', outputRate: 0.32 },
        { item: 'iron-gear-wheel', outputRate: 0.92 },
        // @formatter: on
    ] as RatedFactoryBlock[],
};

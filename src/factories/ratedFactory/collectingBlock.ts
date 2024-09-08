import { EntityBuilders, planToBlueprint } from '../../PlanBuilder';
import { TransportBelt } from '../../transportBelts';
import { AssemblingMachine } from '../../AssemblingMachine';
import { ChemicalPlant } from '../../ChemicalPlant';
import { ElectricFurnace } from '../../ElectricFurnace';
import { SupplyBeltMap } from '../../supplySegment';
import { buildSupplyBlock } from './buildSupplyBlock';
import { Fbp } from '../../Fbp';
import { Network } from '../../circuit';
import { UndergroundBelt } from '../../UndergroundBelt';
import _ from 'lodash';
import { Direction } from '../../Direction';
import { FastInserter, FilterInserter } from '../../inserters';
import { WoodenChest } from '../../WoodenChest';
import { HeavisideGate } from '../../DeciderCombinator';
import { Inverter } from '../../ArithmeticCombinator';
import { ConstantCombinator } from '../../ConstantCombinator';
import { Fluid, Item } from '../../Items';
import { BlockSpec } from './ratedFactory';
import { SmallElectricPole } from '../../SmallElectricPole';

const plan: string = `
ybU.ybU.ybU.ybU.---.---.---.---.---.---.---.ybU.---.---
ybU.ybU.ybU.ybU.---.---.---.---.---.---.---.itU.---.---
ybU.ybU.ybU.ybU.---.---.---.---.---.sc .i1R.isU.---.---
ybU.ybU.ybU.ybU.epl.   .   .   .   .cc .epr.ybU.---.---
`;

// Block collects specified items off the loop.
export function collectingBlock(items: Item[]): Fbp {

    const builders: EntityBuilders = {

        // Input Sensor - transport belt that reads items it has
        is: () => new TransportBelt({
            readContent: 'hold',
        }), //

        // Loop Throttle - stops belt if there is an item that should be picked off
        it: () => new TransportBelt({
            enableCondition: {
                firstOperand: 'signal-everything', operator: 'lte', secondOperand: 8,
            },
        }), //

            // block uses ingredients from the loop
            // Ingredients Feeder #1 - controlled filtered picker, picks ingredients from the loop bus.
            i1: () => new FilterInserter({
                filterMode: 'whitelist', filters: items,
            }),

            // storage chest - stockpile ingredients.
            sc: () => new WoodenChest(), //

            // Ingredients Feeder #2 - moves ingredients from storage chest to the production unit. 
            i2: () => new FastInserter(), //

            // Decider 1 - outputs 1 for each item on the loop bus.
            d1: () => new HeavisideGate(), //

            // Decider 2 - outputs 1 for items in deficit.
            d2: () => new HeavisideGate(), // 

            // arithmetic combinator (Calculator) - negates incoming numbers, to calculate deficit.
            c1: () => new Inverter(), //

            // Constant Combinator - defines necessary ingredients
            cc: () => new ConstantCombinator({
                signals: _.map(items, (item) => ({
                    signal: item, count: 8,
                })),
            }), //

        // yellow belt
        yb: () => new TransportBelt(), //

        // Electric Pole - Left
        epl: () => new SmallElectricPole(), // 

        // Electric Pole - Right
        epr: () => new SmallElectricPole(),//
    };

    // note: plan builder only handles simple exports in <name>:<entity> format.
    // which is why fluid connection is handled below separately.
    const fbp = planToBlueprint(plan, builders, [
        // @formatter:off
        // electricity
        [Network.Electric, 'epl', 'epr'],
        // constant combinator outputs 8 for each required item.
        // so we stop the belt if belt content + constant combinator is greater than 8
        // note: max count on the belt is 8
        [Network.Red, 'cc', 'it'],
        [Network.Red, 'is', 'it'],
        // @formatter:on
    ], {
        electricity: 'epl', timer: 'epr'
    });

    return fbp;
}


import { BlockSpec } from './ratedFactory';
import { SupplyBeltMap } from '../../supplySegment';
import { Fbp } from '../../Fbp';
import { Editor } from '../../Editor';
import { buildRatedFactoryBlock } from './ratedFactoryBlock';
import { Network } from '../../circuit';
import { ConnectionPoint } from '../../ConnectionPoint';
import { collectingBlock } from './collectingBlock';
import { Item } from '../../Items';
import _ from 'lodash';

export function compileRatedFactory(blockSpecs: BlockSpec[], supplyBeltMap: SupplyBeltMap): Fbp {
    const factory = new Fbp('rated factory');

    const editor = new Editor(factory);

    let previousBlock: Fbp | undefined = undefined;
    for (const blockSpec of blockSpecs) {
        const block = blockSpec.recipe.equipment !== 'collector'
            ? buildRatedFactoryBlock(blockSpec, supplyBeltMap)
            : collectingBlock(_.keys(blockSpec.recipe.ingredients) as Item[]);
        editor.addBlueprint(block);
        editor.u(4);

        if (previousBlock !== undefined) {
            // interconnect
            factory.addConnection(
                Network.Red,
                previousBlock.exports['timer'] as ConnectionPoint,
                block.exports['timer'] as ConnectionPoint,
            );
            factory.addConnection(
                Network.Electric,
                previousBlock.exports['electricity'] as ConnectionPoint,
                block.exports['electricity'] as ConnectionPoint,
            );
        }
        previousBlock = block;
    }

    return factory;
}

import { SupplyBeltMap } from '../../supplySegment';
import { Fbp } from '../../Fbp';
import { Editor } from '../../Editor';
import { BlockType, buildRatedFactoryBlock } from './ratedFactoryBlock';
import { recipes } from '../../Recipe';
import { Network } from '../../circuit';
import { ConnectionPoint } from '../../ConnectionPoint';
import { BlockSpec, RatedFactoryBlock } from './ratedFactory';

function getBlockType(matchesPreviousRecipe: boolean, matchesNextRecipe: boolean) {
    if (matchesPreviousRecipe && matchesNextRecipe) {
        return 'middle';
    } else if (matchesPreviousRecipe) {
        return 'top';
    } else if (matchesNextRecipe) {
        return 'bottom';
    } else {
        return 'single';
    }
}

export function buildRatedFactory(factorySequence: RatedFactoryBlock[], supplyBeltMap: SupplyBeltMap): Fbp {

    // expand factory sequence to convert outputRate (in items per second) to outputRate in ticks per cycle
    factorySequence = expandFactorySequence(factorySequence, 0.75);

    const factory = new Fbp('rated factory');

    const editor = new Editor(factory);

    const blockSpecs: BlockSpec[] = [];
    for (let blockIndex = 0; blockIndex < factorySequence.length; blockIndex++) {
        const blockSpec = factorySequence[blockIndex];
        const matchesPreviousRecipe = blockIndex > 0 && factorySequence[blockIndex - 1].item === blockSpec.item;
        const matchesNextRecipe = blockIndex < factorySequence.length - 1 && factorySequence[blockIndex + 1].item ===
            blockSpec.item;

        const blockType: BlockType = getBlockType(matchesPreviousRecipe, matchesNextRecipe);

        let adjustedOutputRate = blockSpec.outputRate;
        if (blockType === 'top') {
            // add preceding matching blocks output rates
            for (let precedingBlockIndex = blockIndex - 1; precedingBlockIndex >= 0 &&
            factorySequence[precedingBlockIndex].item == blockSpec.item; precedingBlockIndex--) {
                adjustedOutputRate += factorySequence[precedingBlockIndex].outputRate;
            }
        }

        blockSpecs.push({
            recipe: recipes[blockSpec.item]!, blockType: blockType, outputRate: adjustedOutputRate,
        });
    }

    let previousBlock: Fbp | undefined = undefined;
    for (const blockSpec of blockSpecs) {
        const block = buildRatedFactoryBlock(blockSpec, supplyBeltMap);
        editor.addBlueprint(block);
        editor.u(4);

        if (previousBlock !== undefined) {
            // interconnect
            factory.addConnection(Network.Red,
                previousBlock.exports['timer'] as ConnectionPoint,
                block.exports['timer'] as ConnectionPoint,
            );
            factory.addConnection(Network.Electric,
                previousBlock.exports['electricity'] as ConnectionPoint,
                block.exports['electricity'] as ConnectionPoint,
            );
        }
        previousBlock = block;
    }

    return factory;
}

function expandFactorySequence(factorySequence: RatedFactoryBlock[], assemblyMachineSpeed: number) {
    const expandedSequence: RatedFactoryBlock[] = [];
    for (const block of factorySequence) {
        console.log(block.item);
        const requiredBlockCount = block.outputRate * recipes[block.item]!.craftingTime / assemblyMachineSpeed;
        const wholeBlockCount = Math.ceil(requiredBlockCount);
        for (let blockIndex = 0; blockIndex < wholeBlockCount; blockIndex++) {
            const lastBlock = blockIndex == wholeBlockCount - 1;
            expandedSequence.push({
                item: block.item, // through the magic of math, 75 means 7.5 per second,
                // so we just multiply the rate by 10 to get rate in 1/75 cycles
                outputRate: lastBlock ? Math.ceil(block.outputRate * 10) : 0,
            });
        }
    }
    return expandedSequence;
}

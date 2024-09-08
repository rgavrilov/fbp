import { Fbp } from '../../Fbp';
import { Recipe } from '../../Recipe';
import { Item, items } from '../../Items';
import { SupplyBeltMap } from '../../supplySegment';
import {
    Bom, buildBom, flattenTree, OutputRate, transformAndCopyTree, traverseTreeChildFirst, Tree,
} from '../../bom/bomBuilder';
import _ from 'lodash';
import { compileRatedFactory } from './ratedFactoryCompiler';

export type Block = { recipe: Recipe, outputRate: number, utilization: number, utilizationLimit?: number };

export type RatedFactoryBlock = { item: Item, outputRate: number };

export function buildRatedFactory(outputRate: RatedFactoryBlock[], supplyBeltMap: SupplyBeltMap): Fbp {
    const blockSpecs = computeRatedSequence(outputRate, _.keys(supplyBeltMap) as (Item)[], 0.75);
    const fbp = compileRatedFactory(blockSpecs, supplyBeltMap);
    return fbp;
}

function calculateBlockIngestionRate(recipe: Recipe, assemblyMachineSpeed: number, rawMaterials: Item[]): number {
    const itemIngredients = _.pickBy(recipe.ingredients,
        (count, ingredient) => items.includes(ingredient as Item) && !rawMaterials.includes(ingredient as Item),
    );
    const totalIngredientCount = _.chain(itemIngredients).values().sum().value();
    const batchesRate = recipe.output / recipe.craftingTime *
        (recipe.equipment === 'assembling-machine' ? assemblyMachineSpeed : 1);
    const ingredientRate = totalIngredientCount * batchesRate;
    return ingredientRate;
}

function createProratedCopy(tree: Tree<Block>, factor: number): Tree<Block> {
    return transformAndCopyTree(tree, block => ({
        ...block, outputRate: block.outputRate * factor, utilization: block.utilization * factor,
    } as Block));
}

function splitRequirementsTree(source: Tree<Block>,
    utilizationToExtract: number,
): [Tree<Block>, Tree<Block> | undefined] {
    if (source.value.utilization <= utilizationToExtract) {
        return [source, undefined];
    } else {
        return [
            createProratedCopy(source, utilizationToExtract / source.value.utilization), 
            createProratedCopy(source, 1 - utilizationToExtract / source.value.utilization),
        ];
    }
}

function compactBlockTree(blockTree: Tree<Block>, rawMaterials: Item[], assemblyMachineSpeed: number): Tree<Block> {
    let changesWereMade: boolean;
    do {
        const blockList: Block[] = [];
        const blockLoads: Map<Item, { blockCount: number, utilization: number }> = new Map();
        traverseTreeChildFirst(blockTree, block => {
            // TODO: limit block utilization to limit ingredient ingestion rate 
            // const blockMaxOutputRate = calculateBlockIngestionRate(block.recipe, assemblyMachineSpeed, rawMaterials);
            if (!blockLoads.has(block.recipe.item)) {
                blockLoads.set(block.recipe.item, { blockCount: 0, utilization: 0 });
            }
            const blockLoad = blockLoads.get(block.recipe.item)!;
            blockLoad.blockCount += 1;
            blockLoad.utilization += block.utilization;
            blockList.push(block);
        });

        const compacting: Map<Item, { compactableBlockCount: number, subtreesToDistribute: Tree<Block>[] }> = new Map();
        blockLoads.forEach(({ blockCount, utilization }, item) => {
            const compactableBlockCount = blockCount - Math.ceil(utilization);
            if (compactableBlockCount > 0) {
                compacting.set(item, { compactableBlockCount, subtreesToDistribute: [] });
            }
        });

        changesWereMade = false;
        let focusItem: Item | undefined = undefined;
        blockList.reverse().forEach(block => {
            // do one item (recipe) at a time
            if ((focusItem !== undefined && block.recipe.item === focusItem) ||
                (focusItem === undefined && compacting.has(block.recipe.item!))) {
                focusItem = block.recipe.item!;
                const compactingBlock = compacting.get(focusItem!)!;
                if (compactingBlock.compactableBlockCount > 0) {
                    // save block's output rate for later
                    const subtreeToDistribute = findNodeInTree(blockTree, block)!;
                    removeFromTree(blockTree, block);
                    compactingBlock.subtreesToDistribute.push(subtreeToDistribute);

                    const renderedBlockTree = flattenTree(blockTree);
                    compactingBlock.compactableBlockCount -= 1;
                    changesWereMade = true;
                } else if (compactingBlock.subtreesToDistribute.length > 0) {
                    while (block.utilization < 1 && compactingBlock.subtreesToDistribute.length > 0) {
                        // take next distributable subtree
                        // split it into two - 
                        // 1) a portion to append to the current block 
                        // (add block output rate and utilization, and copy children)
                        // 2) the remainder to keep in the collection to distribute
                        const availableCapacity = 1 - block.utilization;

                        const [consumableTree, remainingTree] = splitRequirementsTree(compactingBlock.subtreesToDistribute[0],
                            availableCapacity,
                        );
                        compactingBlock.subtreesToDistribute.splice(0, 1);
                        if (remainingTree) {
                            compactingBlock.subtreesToDistribute.push(remainingTree);
                        }

                        // consolidate consumableTree into the current block
                        block.utilization += consumableTree.value.utilization;
                        block.outputRate += consumableTree.value.outputRate;
                        const destinationNode = findNodeInTree(blockTree, block)!;
                        destinationNode.children.push(...consumableTree.children);
                        const renderedBlockTree = flattenTree(blockTree);
                    }

                    //
                    // // add to block's output rate
                    // const availableCapacity = 1 - block.utilization;
                    // const utilizationToDistribute = Math.min(compactingBlock.subtreesToDistribute,
                    // availableCapacity); compactingBlock.subtreesToDistribute -= utilizationToDistribute; const
                    // outputRateToDistribute = block.outputRate / block.utilization * utilizationToDistribute;
                    // block.outputRate += outputRateToDistribute; block.utilization += utilizationToDistribute;  //
                    // add ingredient subtree (will be compacted later) const ingredientsBom = buildBom(block.recipe,
                    // outputRateToDistribute, rawMaterials); const destinationBlockNode = findNodeInTree(blockTree,
                    // block)!; convertRatesToBlocks(ingredientsBom, destinationBlockNode, assemblyMachineSpeed); const
                    // renderedBlockTree = flattenTree(blockTree);
                    changesWereMade = true;
                }
            }
        });
        // keep compacting until no more side effects
    } while (changesWereMade);

    return blockTree;
}

function removeFromTree<T>(tree: Tree<T>, nodeValue: T) {
    const parentNode = findNodeParent(tree, nodeValue);
    if (!parentNode) {
        throw 'Couldn\'t find a parent of a node to remove.';
    }
    parentNode.children = parentNode.children.filter(child => child.value !== nodeValue);
}

function findNodeInTree<T>(tree: Tree<T>, node: T): Tree<T> | undefined {
    if (tree.value === node) {
        return tree;
    }
    for (const child of tree.children) {
        const result = findNodeInTree(child, node);
        if (result) {
            return result;
        }
    }
    return undefined;
}

function findNodeParent<T>(tree: Tree<T>, node: T): Tree<T> | undefined {
    if (tree === node) {
        throw 'Node doesn\'t have a parent because it is the root of the tree';
    }
    for (const child of tree.children) {
        if (child.value === node) {
            return tree;
        }
    }
    for (const child of tree.children) {
        const result = findNodeParent(child, node);
        if (result) {
            return result;
        }
    }
    return undefined;
}

function addBomSubtreeToBlockTree(bomNode: Tree<OutputRate>, outputTree: Tree<Block>, assemblyMachineSpeed: number) {
    const outputNode: Tree<Block> = {
        value: {
            recipe: bomNode.value.recipe,
            outputRate: bomNode.value.outputRate,
            utilization: bomNode.value.outputRate / (bomNode.value.recipe.output / bomNode.value.recipe.craftingTime *
                (bomNode.value.recipe.equipment === 'assembling-machine' ? assemblyMachineSpeed : 1)),
        }, children: [],
    };
    outputTree.children.push(outputNode);
    convertRatesToBlocks(bomNode, outputNode, assemblyMachineSpeed);
}

export function convertRatesToBlocks(bom: Bom, outputTree: Tree<Block>, assemblyMachineSpeed: number) {
    // go through each node (except root)
    // for each child
    //   - figure out how many blocks need to be built to satisfy output rate
    //   - create necessary number of blocks in the result tree by prorating the subtree
    _.forEach(bom.children, (bomChild) => {
        const blockUtilizationRate = calculateUtilizationRate(bomChild.value, assemblyMachineSpeed);
        if (blockUtilizationRate <= 1) {
            // copy node as is
            addBomSubtreeToBlockTree(bomChild, outputTree, assemblyMachineSpeed);
        } else {
            // block is too big. Need to split it into smaller blocks
            // let's try prorating the subtree
            const blockCount = Math.ceil(blockUtilizationRate);
            const proratedBomChild = prorateBom(bomChild, 1 / blockCount);
            _.times(blockCount, () => {
                addBomSubtreeToBlockTree(proratedBomChild, outputTree, assemblyMachineSpeed);
            });
        }
    });
}

function prorateBom(bom: Bom, factor: number) {
    // this function will create a copy of the bom (which is a Tree<OutputRate>) but the
    // outputRate property of each destination node will be scaled by the factor.
    const proratedBom: Bom = {
        value: { ...bom.value, outputRate: bom.value.outputRate * factor }, children: [],
    };
    _.forEach(bom.children, (child) => {
        proratedBom.children.push(prorateBom(child, factor));
    });
    return proratedBom;
}

function calculateUtilizationRate(outputRate: OutputRate, assemblyMachineSpeed: number): number {
    const equipmentSpeedFactor = outputRate.recipe.equipment === 'assembling-machine' ? assemblyMachineSpeed : 1;
    const blockOutputRate = outputRate.recipe.output / (outputRate.recipe.craftingTime / equipmentSpeedFactor);
    return outputRate.outputRate / blockOutputRate;
}

/**
 * Rated factory uses a throttled conveyor belt to limit the rate at which items are produced.
 * rated factory steps
 * 1. build a bom graph -> tree where each node is a recipe + required production rate
 * 2. inline the tree into a list
 * 3. calculate manuf. equipment count for each node
 * 4. optimize the list
 * 5. convert the list of equipments into block specs
 * 6. build the row blueprint
 */
export function computeRatedSequence(outputRate: RatedFactoryBlock[],
    rawMaterials: Item[],
    assemblyMachineSpeed: number,
) {
    // Step 1: build BoM graph (item + rate)
    const outputRecipe: Recipe = {
        // a hack: using modified wooden-chest as a root-level block 
        item: 'wooden-chest',
        ingredients: _.chain(outputRate).keyBy(rate => rate.item).mapValues((rate) => rate.outputRate).value(),
        craftingTime: 1,
        output: 1,
        equipment: 'collector',
    };
    const bom: Bom = buildBom(outputRecipe, 1, rawMaterials);

    // Step: convert rates into blocks
    // e.g. if required output is 1.7 items per second, and a block produces 1 item per second
    // then we'll need 2 blocks (with rate 1, and rate 0.7).
    // Note: to reduce loop congestion - we can limit a rate for high-input recipes. 
    const blockTree: Tree<Block> = {
        value: {
            recipe: outputRecipe, outputRate: 1, utilization: 1,
        }, children: [],
    };
    convertRatesToBlocks(bom, blockTree, assemblyMachineSpeed);

    // Step: compact the block tree
    // 1. per item:
    //   * calculate blocks needed
    //   * calculate current utilization
    //   * calculate utilization that can be compacted (redistributed from downstream to upstream)
    // 2. starting from the top (upstream) in flattened view - find next block to be redistributed
    //   * eliminate the block, record its utilization
    //   * find next block that has unused capacity, calculate a BoM for the item at that capacity
    //   * add BoM tree to this node.
    //   * repeat until all utilization has been redistributed

    const compactedBlockTree = compactBlockTree(blockTree, rawMaterials, assemblyMachineSpeed);

    // Step: flatten the BOM into a flat list - in a way where upstream block is always upstream
    const blockList: Block[] = flattenTree(compactedBlockTree);

    // Step 3: compile block specs
    const blockSpecs = compileBlockSpecs(blockList, rawMaterials);

    return blockSpecs;
}

export type BlockSpec = {
    recipe: Recipe, outputRate?: number, features: {
        recycler?: true, output?: true, downstreamConnection?: true, upstreamConnection?: true, buffer?: true
    }
};

export function compileBlockSpecs(blocks: Block[], rawMaterials: Item[]): BlockSpec[] {
    // going down the stream

    // rules:
    // * there is exactly one recycler per recipe per factory
    // * buffer/picker/throttler is only necessary when block consumes ingredients off the supply belt

    // cluster is a group of adjacent blocks for a single recipe
    // Cluster rules:
    // * First block has downstream connection
    // * Only first block can have a recycler
    // * Only last block can have an output
    // * Last block has upstream connection
    // * Middle blocks have upstream and downstream connections


    let currentCluster: { combinedOutputRate: number } = { combinedOutputRate: 0 };
    const result: BlockSpec[] = [];
    const recyclers: Item[] = [];
    for (let blockIndex = 0; blockIndex < blocks.length; ++blockIndex) {
        const block = blocks[blockIndex];
        const previous = blockIndex > 0 ? blocks[blockIndex - 1] : undefined;
        const next = blockIndex < blocks.length - 1 ? blocks[blockIndex + 1] : undefined;

        const spec: BlockSpec = {
            recipe: block.recipe, outputRate: undefined, features: {},
        };

        if (!recyclers.includes(block.recipe.item)) {
            spec.features.recycler = true;
            recyclers.push(block.recipe.item);
        }

        const isBeginningOfCluster = block.recipe.item !== previous?.recipe.item;
        if (isBeginningOfCluster) {
            currentCluster = { combinedOutputRate: 0 };
        }

        currentCluster.combinedOutputRate += block.outputRate;

        if (block.recipe.item === previous?.recipe.item) {
            spec.features.upstreamConnection = true;
        }

        if (block.recipe.item === next?.recipe.item) {
            spec.features.downstreamConnection = true;
        }

        const isEndOfCluster = block.recipe.item !== next?.recipe.item;
        if (isEndOfCluster) {
            spec.features.output = true;
            spec.outputRate = currentCluster.combinedOutputRate;
        }

        // check if picker/buffer/ring-throttle are needed
        const intermediateIngredients = _.difference(_.keys(block.recipe.ingredients), rawMaterials);
        if (intermediateIngredients.length > 0) {
            spec.features.buffer = true;
        }

        result.push(spec);
    }

    return result;
}



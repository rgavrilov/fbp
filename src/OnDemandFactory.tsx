import { Fbp, PipeConnection } from './Fbp';
import { Editor } from './Editor';
import { onDemandFactoryBlock } from './OnDemandFactoryBlock';
import { FactorioRecipeName } from './recipesExport';
import _ from 'lodash';
import { recipes } from './Recipe';
import { FluidConnection, layoutPipes } from './FluidBus';
import { TransportBelt } from './transportBelts';
import { Direction } from './Direction';
import { buildControlBlock } from './BuildControlBlock';
import { Network } from './circuit';
import { ConnectionPoint } from './ConnectionPoint';
import { SupplyBeltMap } from './supplySegment';
import { getMissingRecipes } from './ingredientsChecker';
import { fluids } from './Items';

function interconnect(block1: Fbp, block2: Fbp, network: Network, point: string, factory: Fbp) {
    factory.addConnection(network, block1.exports[point] as ConnectionPoint, block2.exports[point] as ConnectionPoint);
}

export function onDemandFactory(fullFactory: boolean,
    factorySequence: FactorioRecipeName[],
    chunkSize: number,
    supplyBeltMap: SupplyBeltMap,
) {

    const missingIngredients = getMissingRecipes(
        factorySequence,
        Object.keys(supplyBeltMap).concat(fluids).concat([]),
    );
    if (missingIngredients.length) {
        console.error("Missing the following ingredients:\n", missingIngredients.join(", "));
    }

    console.log("Factory size:", factorySequence.length);

    const factory = new Fbp('factory');

    // control block
    let previousBlock: Fbp | undefined = undefined;
    const editor = new Editor(factory);
    const controlBlock = fullFactory ? buildControlBlock() : undefined;
    if (controlBlock) {
        previousBlock = controlBlock;
        editor.addBlueprint(controlBlock);
        editor.d(2);
    }

    const fluidConnections: FluidConnection[] = [];
    const rows = _.chunk(factorySequence, chunkSize);

    rows.forEach((rowRecipes, chunkIndex) => {
        const rowFbp = new Fbp('row-' + chunkIndex);
        const rowEditor = new Editor(rowFbp);
        rowRecipes.map(r => recipes[r]).forEach(r => {
            const block = onDemandFactoryBlock(r, supplyBeltMap, { includeReverseBus: true, overstockMultiplier: 10 * 0.75 });
            const blockPos = rowEditor.cursor;
            rowEditor.addBlueprint(block);
            rowEditor.d(4);

            if (previousBlock !== undefined) {

                interconnect(previousBlock, block, Network.Red, 'busTransactions', factory);
                interconnect(previousBlock, block, Network.Green, 'busTransactions', factory);
                interconnect(previousBlock, block, Network.Electric, 'busTransactions', factory);
                interconnect(previousBlock, block, Network.Red, 'demand', factory);

                ['pipe1', 'pipe2'].forEach(pipeExportName => {
                    const pipe = block.exports[pipeExportName] as (PipeConnection | undefined);
                    if (!!pipe) {
                        const pipe1Position = block.elements.find(e => e.entity === pipe.entity)!.position;
                        const y = blockPos.y + pipe1Position.y;
                        fluidConnections.push({ fluid: pipe.fluid, position: y });
                    }
                });
            }
            previousBlock = block;
        });

        if (chunkIndex % 2 === 1) {
            rowFbp.rotate(2);
        }
        editor.addBlueprint(rowFbp);
        editor.r(12);

        // Note: I do not interconnect rows yet.
        // TODO: interconnect rows
        previousBlock = undefined;
    });

    // add return
    if (false && fullFactory) {
        editor.r(10);
        editor.add(new TransportBelt(), Direction.Right);
        editor.r();
        editor.add(new TransportBelt(), Direction.Right);
        editor.r();
        editor.add(new TransportBelt(), Direction.Right);
        editor.r();
        editor.add(new TransportBelt(), Direction.Up);
    }

    // add fluid bus
    const fluidBus = layoutPipes(fluidConnections, ['water', 'petroleum-gas', 'sulfuric-acid', 'lubricant']);
    editor.moveTo(-5, fullFactory ? 2 : 0).addBlueprint(fluidBus);

    return factory;
}

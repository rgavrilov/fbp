import { Fbp, PipeConnection } from './Fbp';
import { Editor } from './Editor';
import { onDemandFactoryBlock } from './OnDemandFactoryBlock';
import { FactorioRecipe } from './recipesExport';
import _ from 'lodash';
import { recipes } from './Recipe';
import { FluidConnection, layoutPipes } from './FluidBus';
import { TransportBelt } from './transportBelts';
import { Direction } from './Direction';
import { buildControlBlock } from './BuildControlBlock';
import { Network } from './circuit';
import { ConnectionPoint } from './ConnectionPoint';

export function onDemandFactory() {
    const factory = new Fbp('factory');

    const repeatT: <T>(builder: () => T, times: number) => T[] = (builder, times) => {
        return _.map(Array(times), () => builder());
    };

    const repeat = (recipe: FactorioRecipe, times: number) => repeatT<FactorioRecipe>(() => recipe, times);

    type FactoryBlock = FactorioRecipe | {}


    const testFactory1: FactorioRecipe[] = [
        'copper-cable', 'electronic-circuit', 'electronic-circuit',
    ];

    const testFactory2: FactorioRecipe[] = [
        'copper-cable',
        'plastic-bar',
        ...repeat('advanced-circuit', 3),
    ];

    const sciencePacksFactory: FactorioRecipe[] = [
        'copper-cable',
        'copper-cable',
        'electronic-circuit',
        'copper-cable',
        'electronic-circuit',
        'copper-cable',
        'electronic-circuit',

        'copper-cable',
        'plastic-bar',
        ...repeat('advanced-circuit', 4),
        'copper-cable',
        'plastic-bar',
        ...repeat('advanced-circuit', 4),
        ...repeat('processing-unit', 2),
        'iron-gear-wheel',
        ...repeat('automation-science-pack', 1),
        'inserter',
        'transport-belt',
        ...repeat('logistic-science-pack', 2),
        'pipe',
        ...repeat('engine-unit', 3),
        'electric-engine-unit',
        'battery',
        ...repeat('flying-robot-frame', 2),
        'plastic-bar',
        ...repeat('low-density-structure', 4),
        ...repeat('utility-science-pack', 2),
        'productivity-module',
        ...repeat('stone-brick', 4),
        'electric-furnace',
        'stone-wall',
        'firearm-magazine',
        'piercing-rounds-magazine',
        'grenade',
        ...repeat('military-science-pack', 1),
        'sulfur',
        ...repeat('chemical-science-pack', 3),
        'iron-stick',
        'rail',
        ...repeat('production-science-pack', 2),
    ];

    // control block
    let previousBlock: Fbp | undefined = undefined;
    const editor = new Editor(factory);
    const controlBlock = buildControlBlock();
    previousBlock = controlBlock;
    editor.addBlueprint(controlBlock);
    editor.d(2);

    function interconnect(block1: Fbp, block2: Fbp, network: Network, point: string) {
        factory.addConnection(network,
            block1.exports[point] as ConnectionPoint,
            block2.exports[point] as ConnectionPoint,
        );
    }

    const fluidConnections: FluidConnection[] = [];
    sciencePacksFactory.map(r => recipes[r]).forEach(r => {
        const block = onDemandFactoryBlock(r);
        const blockPos = editor.cursor;
        editor.addBlueprint(block);
        editor.d(4);

        if (previousBlock !== undefined) {

            interconnect(previousBlock, block, Network.Red, 'busTransactions');
            interconnect(previousBlock, block, Network.Green, 'busTransactions');
            interconnect(previousBlock, block, Network.Red, 'demand');
            interconnect(previousBlock, block, Network.Electric, 'busTransactions');

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

    // add return
    editor.r(10);
    editor.add(new TransportBelt(), Direction.Right);
    editor.r();
    editor.add(new TransportBelt(), Direction.Right);
    editor.r();
    editor.add(new TransportBelt(), Direction.Up);

    // add fluid bus
    const fluidBus = layoutPipes(fluidConnections, ['water', 'petroleum-gas', 'sulfuric-acid', 'lubricant']);
    editor.moveTo(-5, 0).addBlueprint(fluidBus);

    return factory;
}

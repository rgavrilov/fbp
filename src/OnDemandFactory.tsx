import { Fbp, PipeConnection } from './Fbp';
import { Editor } from './Editor';
import { onDemandFactoryBlock } from './OnDemandFactoryBlock';
import { Network } from './circuit';
import { FactorioRecipe } from './recipesExport';
import _ from 'lodash';
import { recipes } from './Recipe';
import { FluidConnection, layoutPipes } from './FluidBus';
import { TransportBelt } from './transportBelts';
import { Direction } from './Direction';
import { buildControlBlock } from './BuildControlBlock';

export function onDemandFactory() {
    const factory = new Fbp('factory');

    const repeatT: <T>(builder: () => T, times: number) => T[] = (builder, times) => {
        return _.map(Array(times), () => builder());
    };

    const repeat = (recipe: FactorioRecipe, times: number) => repeatT<FactorioRecipe>(() => recipe, times);

    type FactoryBlock = FactorioRecipe | {}

    const sciencePacksFactory: FactorioRecipe[] = [
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

    const fluidConnections: FluidConnection[] = [];
    sciencePacksFactory.map(r => recipes[r]).forEach(r => {
        const block = onDemandFactoryBlock(r);
        const blockPos = editor.cursor;
        editor.addBlueprint(block);
        editor.d(4);
        if (previousBlock !== undefined) {
            factory.addConnection(Network.Red,
                previousBlock.publicConnectionPoints.demand,
                block.publicConnectionPoints.demand,
            );
            factory.addConnection(Network.Green,
                previousBlock.publicConnectionPoints.demand,
                block.publicConnectionPoints.demand,
            );
            factory.addConnection(Network.Red,
                previousBlock.publicConnectionPoints.control,
                block.publicConnectionPoints.control,
            );
            factory.addElectricConnection(previousBlock.publicPoles.demand, block.publicPoles.demand);

            ['pipe1', 'pipe2'].forEach(pipeExportName => {
                const pipe = block.exports[pipeExportName] as (PipeConnection | undefined);
                if (!!pipe) {
                    const pipe1Position = block.getEntityPosition(pipe.entity)!;
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
    editor.add(new TransportBelt(), Direction.Up);

    // add fluid bus
    const fluidBus = layoutPipes(fluidConnections, ['water', 'petroleum-gas', 'sulfuric-acid', 'lubricant']);
    editor.moveTo(-5, 0).addBlueprint(fluidBus);

    return factory;
}

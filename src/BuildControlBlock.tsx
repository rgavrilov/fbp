import { Network } from './circuit';
import { planToBlueprint } from './PlanBuilder';
import { ElectricPole } from './ElectricPole';
import { IdentityCombinator, Inverter } from './ArithmeticCombinator';
import { GuiSignalDisplay } from './GuiSignalDisplay';
import { TransportBelt } from './transportBelts';

export function buildControlBlock(includeSignalDisplays: boolean) {

    const plan = `
   .   .   .   .   .   .   .   .iaD.   .aaU.   .   .   .   .   .
   .   .   .   .   .   .tp .s1 .   .s2 .   .dp .   .   .   .   .`;

    return planToBlueprint(plan, {
        tp: () => new ElectricPole(),
        dp: () => new ElectricPole(),
        ia: () => new Inverter(),
        aa: () => new IdentityCombinator(),
        s1: () => includeSignalDisplays ? new GuiSignalDisplay() : undefined,
        s2: () => includeSignalDisplays ? new GuiSignalDisplay() : undefined,
        yb: () => new TransportBelt(),
    }, [
        [Network.Green, 'tp', 'ia:input'],
        [Network.Green, 'ia:output', 'aa:input'],
        [Network.Green, 'ia:output', 'aa:input'],
        [Network.Red, 'tp', 'aa:input'],
        [Network.Green, 'aa:output', 'aa:input'],
        [Network.Red, 'aa:output', 'dp'],
        includeSignalDisplays ? [Network.Green, 'ia:output', 's1'] : undefined,
        includeSignalDisplays ? [Network.Red, 'aa:output', 's2'] : undefined,
    ].filter(Boolean).map(i => i as [
        Network, // network
            string | { id: string, circuit: 'input' | 'output' }, // point1
            string | { id: string, circuit: 'input' | 'output' }, // point2
    ]), {
        busTransactions: 'tp', demand: 'dp',
    });
}

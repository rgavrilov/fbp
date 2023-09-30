import { Network } from './circuit';
import { planToBlueprint } from './PlanBuilder';
import { ElectricPole } from './ElectricPole';
import { IdentityCombinator, Inverter } from './ArithmeticCombinator';
import { GuiSignalDisplay } from './GuiSignalDisplay';
import { TransportBelt } from './transportBelts';

export function buildControlBlock() {

    const plan = `
   .   .   .   .   .tp .iaD.   .aaU.   .dp .   .   .   .   .
   .   .   .   .   .s1 .   .s2 .   .   .   .   .   .   .   .`;

    return planToBlueprint(plan, {
        tp: () => new ElectricPole(),
        dp: () => new ElectricPole(),
        ia: () => new Inverter(),
        aa: () => new IdentityCombinator(),
        s1: () => new GuiSignalDisplay(),
        s2: () => new GuiSignalDisplay(),
        yb: () => new TransportBelt(),
    }, [
        [Network.Green, 'tp', 'ia:input'],
        [Network.Green, 'ia:output', 'aa:input'],
        [Network.Green, 'ia:output', 'aa:input'],
        [Network.Red, 'tp', 'aa:input'],
        [Network.Green, 'aa:output', 'aa:input'],
        [Network.Red, 'aa:output', 'dp'],
        [Network.Green, 'ia:output', 's1'],
        [Network.Red, 'aa:output', 's2'],
    ], {
        busTransactions: 'tp', demand: 'dp',
    });
}

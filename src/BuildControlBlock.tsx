import { Network } from './circuit';
import { planToBlueprint } from './PlanBuilder';
import { ElectricPole } from './ElectricPole';
import { IdentityCombinator, Inverter } from './ArithmeticCombinator';
import { GuiSignalDisplay } from './GuiSignalDisplay';
import { TransportBelt } from './transportBelts';

export function buildControlBlock() {

    const plan = `
   .   .   .   .   .tp .iaD.   .aaU.   .dp .ybD.ybL.ybL.ybL.
   .   .   .   .   .s1 .   .s2 .   .   .   .ybD.   .   .ybU.`;

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
    ], {
        busTransactions: 'tp', demand: 'dp',
    });


    // const fbp = new Fbp('control-block');
    // const editor = new Editor(fbp);
    //
    // const busTransactionsPole = new ElectricPole();
    // const demandPole = new ElectricPole();
    // const accum = new IdentityCombinator();
    // const inverter = new Inverter();
    // const busDisplay = new GuiSignalDisplay();
    // const controlDisplay = new GuiSignalDisplay();
    //
    // editor.r(4).add(busTransactionsPole);
    // editor.d().add(busDisplay);
    // editor.u().r().add(accum, Direction.Down);
    // editor.r().add(demandPole);
    // editor.d().add(controlDisplay);
    // editor.u().r().add(inverter, Direction.Up);
    // // return belt
    // editor.r(3).d().add(new TransportBelt(), Direction.Down);
    // editor.r().add(new TransportBelt(), Direction.Left);
    // editor.r().add(new TransportBelt(), Direction.Left);
    //
    // editor.fbp.addConnection(Network.Red, busTransactionsPole, demandPole);
    // editor.fbp.addConnection(Network.Green, busTransactionsPole, accum.input);
    // editor.fbp.addConnection(Network.Red, accum.output, accum.input);
    // editor.fbp.addConnection(Network.Red, accum.output, inverter.input);
    // editor.fbp.addConnection(Network.Red, accum.output, busDisplay);
    // editor.fbp.addConnection(Network.Red, inverter.output, demandPole);
    // editor.fbp.addConnection(Network.Red, inverter.output, controlDisplay);
    //
    // editor.fbp.addExport('busTransactions', busTransactionsPole);
    // editor.fbp.addExport('demand', demandPole);
    //
    // return fbp;
}

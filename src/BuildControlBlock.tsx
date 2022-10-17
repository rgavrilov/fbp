import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { ElectricPole } from './ElectricPole';
import { IdentityCombinator, Inverter } from './ArithmeticCombinator';
import { GuiSignalDisplay } from './GuiSignalDisplay';
import { Direction } from './Direction';
import { Network } from './circuit';
import { TransportBelt } from './transportBelts';

export function buildControlBlock() {
    const fbp = new Fbp('control-block');
    const editor = new Editor(fbp);

    const demandPole = new ElectricPole();
    const controlPole = new ElectricPole();
    const accum = new IdentityCombinator();
    const inverter = new Inverter();
    const busDisplay = new GuiSignalDisplay();
    const controlDisplay = new GuiSignalDisplay();

    editor.r(4).add(demandPole);
    editor.d().add(busDisplay);
    editor.u().r().add(accum, Direction.Down);
    editor.r().add(controlPole);
    editor.d().add(controlDisplay);
    editor.u().r().add(inverter, Direction.Up);
    // return belt
    editor.r(3).d().add(new TransportBelt(), Direction.Down);
    editor.r().add(new TransportBelt(), Direction.Left);
    editor.r().add(new TransportBelt(), Direction.Left);

    editor.fbp.addConnection(Network.Red, demandPole, controlPole);
    editor.fbp.addConnection(Network.Green, demandPole, accum.input);
    editor.fbp.addConnection(Network.Red, accum.output, accum.input);
    editor.fbp.addConnection(Network.Red, accum.output, inverter.input);
    editor.fbp.addConnection(Network.Red, accum.output, busDisplay);
    editor.fbp.addConnection(Network.Red, inverter.output, controlPole);
    editor.fbp.addConnection(Network.Red, inverter.output, controlDisplay);

    editor.fbp.addExport('demand', demandPole);
    editor.fbp.addExport('control', controlPole);

    return fbp;
}

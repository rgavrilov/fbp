import './App.css';
import { buildBlueprintExport, getBlueprintExchangeString } from './blueprintExport';
import { Direction } from './Direction';
import { Entity } from './Entity';
import { onDemandFactory } from './OnDemandFactory';

// const bpDiagram = `
// Db.Db.Rb.  .  .At....IpIcIfDbUb
// Db.Db.Rb  ......PePcPdDbUb
// Db.Db.Rb  ......DcDfIiDbUb
// Db.Db.Rb  P1CcP2      DbUb
// `;
//
// const bpEntities = {
//     // Down belt
//     Db: [() => new TransportBelt(), Direction.Down],
//     // Red down belt
//     Rb: [()=> new FastTransportBelt(), Direction.Down],
//     // Up belt
//     Up: [()=>new TransportBelt(),Direction.Up],
//     At: [()=>new AssemblingMachine({recipe: recipes.plasticBar})],
// }
//
// const exports = {
//     P1: "demand",
//     P2: "control"
// };
//
// const connections = [
//     [Network.Green,'Pe','Pc'],
//
// ];
//
// const electricConnections = [
//     ['P1', 'P2']
// ];

function App() {

    const factory = onDemandFactory();

    return (<div className="App" style={ { 'minWidth': '100%', 'width': '800px' } }>
        <textarea defaultValue={ getBlueprintExchangeString(factory) } rows={ 10 } style={ { 'minWidth': '100%' } }/>
        <div>
            <button type="button"
                    onClick={ () => { navigator.clipboard.writeText(getBlueprintExchangeString(factory)); } }>
                Copy to Clipboard
            </button>
        </div>
        <pre style={ { textAlign: 'left', border: 'solid thin black', padding: '10px' } }>
            { JSON.stringify(buildBlueprintExport(factory), null, 4) }
        </pre>
    </div>);
}

export default App;

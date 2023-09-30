import './App.css';
import { buildBlueprintExport, getBlueprintExchangeString } from './blueprintExport';
import { onDemandFactory } from './OnDemandFactory';
// import {
//     mallSequence1, mallSequence1SupplyBeltMap, mallSequence2, mallSequence2SupplyBeltMap,
// } from './factories/mallSequence1';
// import { blockSequence, supplyBeltMap } from './factories/yellowAndPurpleFactory';
 // import { blockSequence, supplyBeltMap } from './factories/redCircuitTest';
import { ForwardedRef, forwardRef, FunctionComponent } from 'react';
import { factory as blockSequence, supplyBeltMap } from './factories/artilleryShellsFactory';

type DisabledWithMessage = { disabled: boolean | string | undefined };

function App() {

    const factory = onDemandFactory(
        true,
        blockSequence,
        19,
        supplyBeltMap,
    );

    return (<div className="App" style={ {
        'minWidth': '100%',
        'width': '800px',
    } }>
        <textarea defaultValue={ getBlueprintExchangeString(factory) } rows={ 10 } style={ { 'minWidth': '100%' } }/>
        <div>
            <button type="button"
                    onClick={ () => { navigator.clipboard.writeText(getBlueprintExchangeString(factory)); } }>
                Copy to Clipboard
            </button>
        </div>
        <textarea defaultValue={ JSON.stringify(
            buildBlueprintExport(factory),
            null,
            4,
        ) } rows={ 50 }
                  style={ { 'minWidth': '100%' } }/>
    </div>);
}

export default App;

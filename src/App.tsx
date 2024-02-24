import './App.css';
import { buildBlueprintExport, getBlueprintExchangeString } from './blueprintExport';
import { onDemandFactory } from './OnDemandFactory';

import { factoryLayout as militaryFactoryLayout } from './factories/militaryFactory';

type DisabledWithMessage = { disabled: boolean | string | undefined };

function App() {

    // const factoryLayout = phase1FactoryLayout;
    const factoryLayout = militaryFactoryLayout;

    const factory = onDemandFactory(true, factoryLayout);

    return (<div className="App" style={ {
        'minWidth': '100%', 'width': '800px',
    } }>
        <textarea defaultValue={ getBlueprintExchangeString(factory) } rows={ 10 } style={ { 'minWidth': '100%' } }/>
        <div>
            <button type="button"
                    onClick={ () => { navigator.clipboard.writeText(getBlueprintExchangeString(factory)); } }>
                Copy to Clipboard
            </button>
        </div>
        <textarea defaultValue={ JSON.stringify(buildBlueprintExport(factory), null, 4) } rows={ 50 }
                  style={ { 'minWidth': '100%' } }/>
    </div>);
}

export default App;

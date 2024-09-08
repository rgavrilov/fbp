import './App.css';
import { buildBlueprintExport, getBlueprintExchangeString } from './blueprintExport';
import { onDemandFactory } from './OnDemandFactory';

import { militaryFactoryLayout } from './factories/militaryFactory';
import { yellowAndPurpleFactory } from './factories/yellowAndPurpleFactory';
import { buildRatedFactory } from './factories/ratedFactory/ratedFactory';
import { SupplyBeltMap } from './supplySegment';
import { ratedFactorySequence } from './ratedConstructionBotFactory';
import { allSciencePacksFactory } from './allSciencePacksFactory';

type DisabledWithMessage = { disabled: boolean | string | undefined };

const { supplyBeltMap, factorySequence } = allSciencePacksFactory;


function App() {
    // const factory = onDemandFactory(true, yellowAndPurpleFactory);
    const factory = buildRatedFactory([
        {item: 'automation-science-pack', outputRate: 0.18 },
        {item: 'logistic-science-pack', outputRate: 0.18 },
        {item: 'military-science-pack', outputRate: 0.18 },
        {item: 'chemical-science-pack', outputRate: 0.18 },
        {item: 'production-science-pack', outputRate: 0.18 },
        {item: 'utility-science-pack', outputRate: 0.18 }
    ], {
        'iron-plate': 1, //
        'copper-plate': 1, //
        'steel-plate': 2, //
        'electronic-circuit': 2, //
        'stone': 3, //
        'coal': 3, //
    });

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

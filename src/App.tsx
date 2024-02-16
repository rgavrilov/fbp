import './App.css';
import { buildBlueprintExport, getBlueprintExchangeString } from './blueprintExport';
import { FactoryBlockSpec, onDemandFactory } from './OnDemandFactory';
import {
    mallSequence1, mallSequence1SupplyBeltMap,
} from './factories/mallSequence1';
// import { blockSequence, supplyBeltMap } from './factories/yellowAndPurpleFactory';
// import { blockSequence, supplyBeltMap } from './factories/redCircuitTest';
// import { ForwardedRef, forwardRef, FunctionComponent } from 'react';
// import { factory as blockSequence, supplyBeltMap } from './factories/artilleryShellsFactory';

import { factoryLayout as phase1FactoryLayout } from './factories/phase1Factory';
import { factoryLayout as militaryFactoryLayout } from './factories/militaryFactory';
import _ from 'lodash';

type DisabledWithMessage = { disabled: boolean | string | undefined };

function App() {

    const factoryLayout = phase1FactoryLayout;
    // militaryFactoryLayout;

    const blockSequence: FactoryBlockSpec[] = _.map(factoryLayout.factorySequence, (recipe) => {
        if (typeof recipe === 'string') {
            return {
                recipe: recipe,
                ingredientsMultiplier: 1,
                productLimit: 1,
                stockpileIngredientsForContinuousProduction: false,
            };
        }
        else {
            return recipe;
        }
    });

    const paddedSequence = [
        ...blockSequence, ...(blockSequence.length % 1 ? ['wooden-chest'] : []),
    ];

    const factory = onDemandFactory(true, paddedSequence, paddedSequence.length / 2, factoryLayout.supplyBeltMap);

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

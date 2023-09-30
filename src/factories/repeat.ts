import { FactorioRecipeName } from '../recipesExport';
import _ from 'lodash';

export const repeat = (recipe: FactorioRecipeName, times: number) => _.map(Array(times), () => (() => recipe)());

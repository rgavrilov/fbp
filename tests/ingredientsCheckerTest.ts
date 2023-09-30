import { describe, expect, it } from '@jest/globals';
import { getMissingRecipes } from '../src/ingredientsChecker';

describe('getMissingRecipes', () => {
    it('handles recipe with no ingredients', () => {
        const missing = getMissingRecipes(['copper-cable'], ['copper-plate']);
        expect(missing).toHaveLength(0);
    });
    it('handles recipe with 1-level ingredients', () => {
        const missing = getMissingRecipes(['electronic-circuit'], ['copper-plate', 'iron-plate']);
        expect(missing).toEqual('copper-cable');
    });
    it('plastic-bar', () => {
        const missing = getMissingRecipes(['plastic-bar'], []);
        expect(missing).toEqual(['petroleum-gas', 'coal']);
    });
    it('handles complex recipe', () => {
        const missing = getMissingRecipes(['advanced-circuit', 'electronic-circuit', 'copper-cable'],
            ['copper-plate', 'iron-plate', 'coal'],
        );
        expect(missing).toEqual(['plastic-bar', 'petroleum-gas']);
    });
});

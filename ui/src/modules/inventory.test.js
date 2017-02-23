"use strict;"

jest.unmock('../inventory.js');
jest.unmock('../../reducers.js');

describe('fmtRecipes', () => {
    it('formats ingredients', () => {
        const inventory = require('../inventory');
        const reducers = require('../../reducers');
        const rec = reducers.initialLemonsState.get('recipes');
        const inv = reducers.initialLemonsState.get('inventory');
        const ing = reducers.initialLemonsState.get('ingredients');
        expect(inventory.inventoryDisplay(rec, inv, ing).toJS())
            .toEqual([{'name': 'lemonade', 'on_hand': 10, 'batches': 2, 'yield': 10}]);
    });
});



"use strict;"

jest.unmock('../recipe.js');
jest.unmock('../../reducers.js');


describe('fmtRecipes', () => {
    it('formats ingredients', () => {
        const recipe = require('../recipe');
        const reducers = require('../../reducers');
        expect(recipe.fmtRecipes(reducers.initialLemonsState)
               .getIn([0, 'recipe'])).toEqual('2 lb lemons, 1 lb sugar, 1 gal water');
    });
});



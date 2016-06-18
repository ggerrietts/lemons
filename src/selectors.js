import { createSelector } from 'reselect';

import { weatherByNumber } from './core/weather';
import { inventoryDisplay } from './core/inventory';
import { fmtRecipes } from './core/recipe';

export const currentTimeSelector = (state) => state.lemons.getIn(['time', 'time']).format("MMMM Do, h:mm a");

export const weatherLabelSelectorFactory = (name) => {
    return (state) => {
        let num = state.lemons.getIn(['weather', name]);
        let wea = weatherByNumber(num);
        return wea.get('label');
    };
};

export const routingSelector = state => state.routing.toJS();

export const recipeSelector = state => state.lemons.get('recipes');
export const inventorySelector = state => state.lemons.get('inventory');
export const ingredientSelector = state => state.lemons.get('ingredients');

export const inventoryDisplaySelector = createSelector(
    recipeSelector,
    inventorySelector,
    ingredientSelector,
    inventoryDisplay);

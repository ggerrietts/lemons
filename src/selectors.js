import { createSelector } from 'reselect';

import { inventoryDisplay } from './core/inventory';
import { fmtRecipes } from './core/recipe';

export const recipeSelector = state => state.lemons.get('recipes');
export const inventorySelector = state => state.lemons.get('inventory');
export const ingredientSelector = state => state.lemons.get('ingredients');

export const inventoryDisplaySelector = createSelector(
    recipeSelector,
    inventorySelector,
    ingredientSelector,
    inventoryDisplay);


const initialInventoryState = fromJS([
    {"recipe": "lemonade", "servings": 10}
]);


// should be rewritten as a selector
// { name: "lemonade", on_hand: 10, yield: 10, batches: 2 }
//
import { Map } from 'immutable';

export const inventoryDisplay = (recipes, inventory, ingredients) => recipes.map((recipe) => {
        const recipe_name = recipe.get('name');
        const recipe_ingred = recipe.get('ingredients');
        const recipe_yield = recipe.get('servings');
        const inv_obj = inventory.find(inventory => inventory.get('recipe') === recipe_name);
        const inv_qty = inv_obj ? inv_obj.get('servings') : 0;
        const batches_avail = recipe_ingred.map(ingred => {
            const ingred_nm = ingred.get('name');
            const recipe_qty = ingred.get('amount');
            const ingred_inv = ingredients.find(ing => ing.get('name') === ingred_nm);
            const ingred_qty = ingred_inv ? ingred_inv.get('amount') : 0;
            return (ingred_qty < recipe_qty) ? 0 : (ingred_qty / recipe_qty);
        }).min();
        return Map({
                'name': recipe.get('name'),
                'on_hand': inv_qty,
                'batches': batches_avail,
                'yield': recipe_yield});
});



const initialRecipeState = [
    { 
        "name": "lemonade",
        "servings": 10,
        "ingredients": [
            {"name": "lemons", "amount": 2},
            {"name": "sugar", "amount": 1},
            {"name": "water", "amount": 1}
        ]
    }
];
const initialIngredientState = [{
        name: "water",
        kind: "water",
        amount: 2,
        unit: "gal",
        price: 1.00
    }, {
        name: "lemons",
        kind: "lemons",
        amount: 4,
        unit: "lb",
        price: 2.00
    }, {
        name: "sugar",
        kind: "sugar",
        amount: 2,
        unit: "lb",
        price: 0.5
}];


// actions

// action creators

// reducer

// sagas


// XXX: should be rewritten as a selector
export const fmtRecipes = (state) => {
    return state.get('recipes').map((recipe) => {
        const ingreds = recipe.get('ingredients').reduce((parts, recipe_ingred) => {
            const rec_ing_name = recipe_ingred.get('name');
            const ingred = state.get('ingredients').find((inv_ingred) => inv_ingred.get('name') === rec_ing_name);
            parts.push(`${recipe_ingred.get('amount')} ${ingred.get('unit')} ${rec_ing_name}`);
            return parts;
        }, []).join(', ');
        return recipe.set('recipe', ingreds);
    });
};

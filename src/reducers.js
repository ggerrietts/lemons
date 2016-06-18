
import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import moment from 'moment';

import { ADVANCE_TIME } from './actions/weatherActions';
import { advanceTime } from './core/weather';

import { PURCHASE } from './actions/ingredientActions';
import { processPurchase } from './core/ingredient';

const initialRoutingState = fromJS({
    locationBeforeTransitions: null
});

export function routing(state = initialRoutingState, { type, payload } = {}) {
    if (type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', payload);
    }
    return state;
}


const initialLedgerState = fromJS({
    currentBalance: 10.0,
    totalSales: 0,
    totalCost: 0,
    startingBalance: 10.0
});

const initialWeatherState = fromJS({
    weatherActual: 0.8,
    weatherForecast: 0.8
});

const initialTimeState = fromJS({
    time: moment(new Date(2015,6,1,9,0,0,0)),
    last: moment(new Date(2015,6,1,8,0,0,0))
});

const initialIngredientState = fromJS([{
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
}]);

const initialRecipeState = fromJS([
    { 
        "name": "lemonade",
        "servings": 10,
        "ingredients": [
            {"name": "lemons", "amount": 2},
            {"name": "sugar", "amount": 1},
            {"name": "water", "amount": 1}
        ]
    }
]);

const initialInventoryState = fromJS([
    {"recipe": "lemonade", "servings": 10}
]);


export const initialLemonsState = Map({
    ingredients: initialIngredientState,
    inventory: initialInventoryState,
    time: initialTimeState,
    weather: initialWeatherState,
    ledger: initialLedgerState,
    recipes: initialRecipeState
});

export function lemons(state = initialLemonsState, action) {
    switch (action.type) {
        case ADVANCE_TIME:
            return advanceTime(state, action.payload);
        case PURCHASE:
            return processPurchase(state, action.payload);
        default:
            return state;
    }
}


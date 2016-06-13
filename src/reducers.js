
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

const initialIngredientState = fromJS({
    "water": {
        kind: "water",
        amount: 0,
        unit: "gal",
        price: 1.00
    }, 
    "lemons": {
        kind: "lemons",
        amount: 0,
        unit: "lb",
        price: 2.00
    }, 
    "sugar": {
        kind: "sugar",
        amount: 0,
        unit: "lb",
        price: 0.5
    }
});

const initialLemonsState = Map({
    ingredients: initialIngredientState,
    time: initialTimeState,
    weather: initialWeatherState,
    ledger: initialLedgerState
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


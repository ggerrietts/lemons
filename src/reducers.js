
import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import moment from 'moment';

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

export function ledger(state = initialLedgerState, action) {
    return state;
}

const initialWeatherState = fromJS({
    weatherActual: 0.8,
    weatherForecast: 0.8
});

export function weather(state = initialWeatherState, action) {
    return state;
}

const initialTimeState = fromJS({
    time: moment(new Date(2015,6,1,9,0,0,0)),
    last: moment(new Date(2015,6,1,8,45,0,0))
});

export function time(state = initialTimeState, action) {
    return state;
}

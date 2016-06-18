import { fromJS } from 'immutable';
import moment from 'moment';

export const processPurchase = (state, kind) => {
    let cash = state.getIn(['ledger', 'currentBalance']);
    let cost = state.getIn(['ingredients', kind, 'price']);
    if (cash < cost) {
        return state;
    }
    let newState = (state.setIn(['ledger', 'currentBalance'], cash - cost)
                        .setIn(['ledger', 'totalCost'], state.getIn(['ledger', 'totalCost']) + cost)
                        .setIn(['ingredients', kind, 'amount'], state.getIn(['ingredients', kind, 'amount']) + 1));


    return newState
};


const INITIAL_STATE = {
    currentBalance: 10.0,
    totalSales: 0,
    totalCost: 0,
    startingBalance: 10.0
};

// actions
const PURCHASE = 'ledger/PURCHASE';
const SALE = 'ledger/SALE';

// action creators
// XXX


// sagas
// XXX

// XXX: this thing should generate some actions instead of fucking with the state tree
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

export const ledgerReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case PURCHASE:
      return processPurchase(state, action.kind);
    default:
      return state;
  }
};


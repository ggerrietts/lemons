'use strict';

jest.unmock('../reducers.js');
jest.unmock('react-router-redux');

import { Map, fromJS } from 'immutable';
import { routing, ledger } from '../reducers';
import { LOCATION_CHANGE } from 'react-router-redux';

describe('ledger', () => {
    it('returns identity', () => {
        const initialState = Map();
        expect(ledger(initialState, {})).toEqual(Map());
    })
});

describe('routing', () => {
    beforeEach(function () {
        jasmine.addCustomEqualityTester((actual, expected) => {
            return actual.equals(expected);
        });
    });

    it('returns identity', () => {
        const initialState = Map();
        expect(routing(initialState, {})).toEqual(Map());
    });
    it('delivers the payload', () => {
        const initialState = Map();
        const action = {
            type: LOCATION_CHANGE,
            payload: "__payload__"
        };
        const expected = fromJS({"locationBeforeTransitions": "__payload__"});
        expect(routing(initialState, action)).toEqual(expected);
    });
});



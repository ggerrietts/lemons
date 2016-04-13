'use strict';

jest.unmock('../demand.js');

describe('rawDemand', () => {
    it('returns 10', () => {
        const demand = require('../demand');
        expect(demand.rawDemand()).toBe(10);
    })
});


describe('idealTime', () => {
    it('sets an target hour, on the hour', () => {
        const demand = require('../demand');
        const starting = new Date(2001, 2, 3, 4, 5, 6, 7);
        const target = new Date(2001, 2, 3, 8, 0, 0, 0);
        expect(demand.idealTime(starting, 8)).toEqual(target);
    });
});

describe('hourlyDemandFactor', () => {
    const demand = require('../demand');
    const starting = new Date(2001, 2, 3, 8, 0, 0, 0);
    it('returns perfect identity', () => {
        expect(demand.hourlyDemandFactor(starting, 8, 1.0, 0.2)).toEqual(0.2);
    });
    it('returns zero when outside decay range', () => {
        expect(demand.hourlyDemandFactor(starting, 9, 1.0, 0.2)).toEqual(0);
    });
    it('returns half at half decay', () => {
        expect(demand.hourlyDemandFactor(starting, 9, 0.5, 0.2)).toEqual(0.1);
    });
    it('zeroes out eventually', () => {
        expect(demand.hourlyDemandFactor(starting, 20, 1.0, 0.2)).toEqual(0);
    });
});

describe('timeFactor', () => {
    const demand = require('../demand');
    it('returns for lunch at noon', () => {
        const starting = new Date(2001, 2, 3, 12, 0, 0, 0);
        expect(demand.timeFactor(starting)).toEqual(0.05);
    });
});


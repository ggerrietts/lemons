"use strict;"

jest.unmock('../weather.js');

describe('weatherByNumber', () => {
    it('returns "sunny" for > 0.7', () => {
        const weather = require('../weather');
        expect(weather.weatherByNumber(0.8).get('name')).toEqual('sunny');
    });
    it('returns "partly_cloudy" for = 0.4', () => {
        const weather = require('../weather');
        expect(weather.weatherByNumber(0.4).get('name')).toEqual('partly_cloudy');
    });
});



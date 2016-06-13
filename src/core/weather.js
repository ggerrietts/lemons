import { fromJS } from 'immutable';
import _ from 'lodash';
import moment from 'moment';

export const weatherTypes = [
    { 
        name: "stormy",
        label: "Thunderstorms",
        image: "weather-stormy.svg",
        value: 0.0,
        weight: 0.2
    }, {
        name: "rainy",
        label: "Rainy",
        image: "weather-rainy.svg",
        value: 0.05,
        weight: 0.5
    }, {
        name: "cloudy",
        label: "Cloudy",
        image: "weather-cloudy.svg",
        value: 0.1,
        weight: 0.8
    }, {
        name: "partly_cloudy",
        label: "Partly Cloudy",
        image: "weather-partlyCloudy.svg",
        value: 0.4,
        weight: 1.0
    }, {
        name: "sunny",
        label: "Sunny",
        image: "weather-sunny.svg",
        value: 0.7,
        weight: 1.2
    }
];

export const weatherByNumber = (number) => {
    let weather = _.last(_.filter(weatherTypes, (o) => { return o.value <= number }));
    return fromJS(weather);
};

export const advanceTime = (state, amount) => {
    let oldNow = state.get('time');
    return state.set('last', oldNow).set('time', moment(oldNow).add(amount, 'hours'));
};

import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  weather: {
    actual: 0.8,
    forecast: 0.8
  },
  time: {
    now: moment(new Date(2015,6,1,9,0,0,0)),
    last: moment(new Date(2015,6,1,8,0,0,0))
  }
};

// actions
export const ADVANCE_TIME = "time/ADVANCE_TIME";

// action creators
export function advanceTime(amount) {
    return {
        type: ADVANCE_TIME,
        amount
    };
};

// reducer
export weatherReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case ADVANCE_TIME:
      return advanceTime(state, action.amount);
    default:
      return state;
  };
};

// utility functions
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


export function rawDemand() {
    return 10;
}

export function idealTime(base, target_hr) {
    // prepare an "ideal" time targeted at the given hour
    let ideal = new Date(base.getTime());
    ideal.setMilliseconds(0);
    ideal.setSeconds(0);
    ideal.setMinutes(0);
    ideal.setHours(target_hr);
    return ideal;
}


export function hourlyDemandFactor(actual, target_hour, target_hourly_decay, target_rate) {
    let ideal = idealTime(actual, target_hour);

    // figure out delta from target in hours
    let diff = (Math.abs(ideal - actual) / (1000 * 60 * 60));

    let decay_factor = diff * target_hourly_decay;

    let rate = _.max([0, target_rate - (target_rate * decay_factor)]);

    return rate;
}

const time_weights = {
    'lunch': {
        'hour': 13,
        'decay': 0.5,
        'rate': 0.1
    },
    'morning break': {
        'hour': 10,
        'decay': 1.0,
        'rate': 0.1
    },
    'afternoon break': {
        'hour': 15,
        'decay': 1.0,
        'rate': 0.2
    }
};

export function timeFactor(actual) {
    return _.max(_.map(time_weights, (wt) => {
        return hourlyDemandFactor(actual, wt.hour, wt.decay, wt.rate);
    }));
}


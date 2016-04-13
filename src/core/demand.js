_ = require('lodash');

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


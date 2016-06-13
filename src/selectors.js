import { weatherByNumber } from './core/weather';

export const currentTimeSelector = (state) => state.getIn(['time', 'time']).format("MMMM Do, h:mm a");

export const weatherLabelSelectorFactory = (name) => {
    return (state) => {
        let num = state.getIn(['weather', name]);
        let wea = weatherByNumber(num);
        return wea.get('label');
    };
};

export const routingSelector = state => state.routing.toJS();


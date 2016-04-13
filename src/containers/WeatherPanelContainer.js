import { connect } from 'react-redux';
import { weatherByNumber } from '../core/weather';
import WeatherPanel from '../components/WeatherPanel';

import { currentTimeSelector, weatherLabelSelectorFactory } from '../selectors';


const mapStateToProps = (state) => {
    return {
        time: currentTimeSelector(state.time),
        weather: weatherLabelSelectorFactory('weatherActual')(state.weather),
        forecast: weatherLabelSelectorFactory('weatherForecast')(state.weather)

    };
};


const WeatherPanelContainer = connect(mapStateToProps)(WeatherPanel);

export default WeatherPanelContainer;


import { connect } from 'react-redux';
import WeatherPanel from '../components/WeatherPanel';
import { advanceTime } from '../actions/weatherActions';

import { currentTimeSelector, weatherLabelSelectorFactory } from '../selectors';


const mapStateToProps = (state) => {
    return {
        time: currentTimeSelector(state.lemons),
        weather: weatherLabelSelectorFactory('weatherActual')(state.lemons),
        forecast: weatherLabelSelectorFactory('weatherForecast')(state.lemons)
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdvanceClick: (amt) => {
      dispatch(advanceTime(amt))
    }
  }
}


const WeatherPanelContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherPanel);

export default WeatherPanelContainer;


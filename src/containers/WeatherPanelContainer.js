import { connect } from 'react-redux';
import WeatherPanel from '../components/WeatherPanel';
import { advanceTime } from '../actions/weatherActions';

import { currentTimeSelector, weatherLabelSelectorFactory } from '../selectors';


const mapStateToProps = (state) => {
    return {
        time: currentTimeSelector(state),
        weather: weatherLabelSelectorFactory('weatherActual')(state),
        forecast: weatherLabelSelectorFactory('weatherForecast')(state)
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


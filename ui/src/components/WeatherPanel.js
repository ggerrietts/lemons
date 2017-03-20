import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { weatherForecast, currentTime, advanceTime } from '../modules/weather';
// import { advanceTime } from '../actions/weatherActions';

// import { currentTimeSelector, weatherLabelSelectorFactory } from '../selectors';


export const WeatherPanel = ({time, weather, forecast, onAdvanceClick}) => (
    <div id="weather" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Time &amp; Weather</h3>
        </div>
        <table className="table">
            <tbody>
            <tr>
                <td>Current Weather:</td>
                <td>{ forecast.current.label }</td>
            </tr>
            <tr>
                <td>Tomorrow's Forecast:</td>
                <td>{ forecast.forecast.label }</td>
            </tr>
            <tr>
                <td>Current Time:</td>
                <td>{ time }</td>
            </tr>
            <tr>
                <td><button className="btn btn-default btn-block" onClick={()=>onAdvanceClick(1)}>+1 hr</button></td>
                <td><button className="btn btn-default btn-block" onClick={()=>onAdvanceClick(24)}>+1 day</button></td>
            </tr>
            </tbody>
        </table>
    </div>
);

WeatherPanel.propTypes = {
  time: PropTypes.string.isRequired,
  forecast: PropTypes.object.isRequired,
  onAdvanceClick: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  return {
    time: currentTime(state),
    forecast: weatherForecast(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdvanceClick: (amt) => {
      dispatch(advanceTime(amt))
    }
  }
}


export const WeatherPanelConnector = connect(mapStateToProps, mapDispatchToProps)(WeatherPanel);

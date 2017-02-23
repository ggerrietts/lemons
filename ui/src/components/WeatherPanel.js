import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import WeatherPanel from '../components/WeatherPanel';
import { advanceTime } from '../actions/weatherActions';

import { currentTimeSelector, weatherLabelSelectorFactory } from '../selectors';


export const WeatherPanel = ({time, weather, forecast, onAdvanceClick}) => (
    <div id="weather" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Time &amp; Weather</h3>
        </div>
        <table className="table">
            <tbody>
            <tr>
                <td>Current Weather:</td>
                <td>{ weather }</td>
            </tr>
            <tr>
                <td>Tomorrow's Forecast:</td>
                <td>{ forecast }</td>
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
  weather: PropTypes.string.isRequired,
  forecast: PropTypes.string.isRequired,
  onAdvanceClick: PropTypes.func.isRequired
};


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


export const WeatherPanelContainer = connect(mapStateToProps, mapDispatchToProps)(WeatherPanel);

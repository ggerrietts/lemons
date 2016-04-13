import React, { Component, PropTypes } from 'react';

const WeatherPanel = ({time, weather, forecast}) => (
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
                <td><button className="btn btn-default btn-block">+1 hr</button></td>
                <td><button className="btn btn-default btn-block">+1 day</button></td>
            </tr>
            </tbody>
        </table>
    </div>
);

WeatherPanel.propTypes = {
  time: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  forecast: PropTypes.string.isRequired
};


export default WeatherPanel;

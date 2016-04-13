import React, { Component, PropTypes } from 'react';

import WeatherPanelContainer from "../containers/WeatherPanelContainer";
import LedgerPanelContainer from "../containers/LedgerPanelContainer";
import IngredientPanel from "./IngredientPanel";
import InventoryPanel from "./InventoryPanel";

const MainDashboard = () => (
    <div>
        <div className="page-header">
        <h1><img src="img/mr-lemons.svg" height="75"/> Mister Lemons</h1></div>
        <div id="status" className="row">
            <div className="col-sm-4"><WeatherPanelContainer /></div>
            <div className="col-sm-8"><LedgerPanelContainer /></div>
        </div>
        <div id="supplies" className="row">
            <div className="col-sm-6"><IngredientPanel /></div>
            <div className="col-sm-6"><InventoryPanel /></div>
        </div>
    </div>
);

export default MainDashboard;

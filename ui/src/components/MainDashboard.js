import React from 'react';

import { WeatherPanelConnector } from "../components/WeatherPanel";
import { LedgerPanelConnector } from "../components/LedgerPanel";
//import { IngredientPanelConnector } from "../components/IngredientPanel";
//import { InventoryPanelConnector } from "../components/InventoryPanel";

export const MainDashboard = () => {
  console.log("somebody hep me!");
  return (
    <div>
      <div className="page-header">
      <h1><img src="img/mr-lemons.svg" alt="Mr. Lemons" height="75"/> Mister Lemons</h1></div>
      <div id="status" className="row">
        <div className="col-sm-6">
          <WeatherPanelConnector />
        </div>
        <div className="col-sm-6">
          <LedgerPanelConnector />
        </div>
      </div>
      <div id="supplies" className="row">
        <div className="col-sm-6">
          {/* <IngredientPanelConnector /> */}
        </div>
        <div className="col-sm-6">
          {/* <InventoryPanelConnector /> */}
        </div>
      </div>
    </div>
  );
};

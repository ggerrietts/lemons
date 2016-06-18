import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const InventoryPanel = ({recipes}) => (
    <div id="inventory" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Prepared Inventory</h3>
        </div>
        <table className="table">
        <thead><tr><th>Recipe</th><th>Yield</th><th>Prepared</th><th>Batches Avail</th><th>&nbsp;</th></tr></thead>
        <tbody>{ recipes.map(function (rec) {
            const ingred = recipes[name];
            return ( 
                <tr key={ rec.get('name') }>
                  <td>{ rec.get('name') }</td>
                  <td>{ rec.get('yield') }</td>
                  <td>{ rec.get('on_hand') }</td>
                  <td>{ rec.get('batches') }</td>
                  <td><button className="btn btn-default btn-block">+</button></td>
                </tr>
        )
        })}</tbody>
        </table>
    </div>
);

export default InventoryPanel;

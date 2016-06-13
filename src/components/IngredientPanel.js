import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

/* 2 lb lemons $2/lb
 * 1 lb sugar $5/10 lb
 * 1 gal water $1/ gal
 *
 * 10 servings
 */

const IngredientPanel = ({ ingredients, onPurchaseClick }) => (
    <div id="ingredients" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Ingredient Inventory</h3>
        </div>
        <table className="table">
        <thead><tr><th>Ingredient</th><th>Amount</th><th>Price</th><th>&nbsp;</th></tr></thead>
        <tbody>{ _.values(ingredients).map(function (row) {
            return ( 
                <tr key={ row.kind }>
                  <td>{ row.kind }</td>
                  <td>{ row.amount } { row.unit }</td>
                  <td>${ row.price.toFixed(2) }/{ row.unit }</td>
                  <td><button className="btn btn-default btn-block" onClick={()=>onPurchaseClick(row.kind)}>+</button></td>
                </tr>
        )
        })}</tbody>
        </table>
    </div>
);

export default IngredientPanel;

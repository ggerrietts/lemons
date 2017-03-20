import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { inventoryDisplaySelector } from '../selectors.js';

// import { purchase } from '../actions/ingredientActions.js';

export const InventoryPanel = ({recipes}) => (
    <div id="inventory" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Prepared Inventory</h3>
        </div>
        <table className="table">
        <thead><tr><th>Recipe</th><th>Yield</th><th>Prepared</th><th>Batches Avail</th><th>&nbsp;</th></tr></thead>
        <tbody>{ recipes.map(function (rec) {
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

const mapStateToProps = (state) => {
  const inventoryDisplaySelector = (state) => state.foo;
  const recs = inventoryDisplaySelector(state);
  return {recipes: recs};
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onPurchaseClick: (kind) => {
//       dispatch(purchase(kind))
//     }
//   }
// }

export const InventoryPanelConnector = connect(mapStateToProps)(InventoryPanel);
// export const IngredientPanelConnector = connect(mapStateToProps, mapDispatchToProps)(IngredientPanel);

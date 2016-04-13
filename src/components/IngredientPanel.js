import React, { Component, PropTypes } from 'react';

/* 2 lb lemons $2/lb
 * 1 lb sugar $5/10 lb
 * 1 gal water $1/ gal
 *
 * 10 servings
 */

class IngredientPanel extends Component {
    render() {
        return (
            <div id="ingredients" className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Ingredient Inventory</h3>
                </div>
                <div className="panel-body">
                    Sugar, Lemons, Water
                </div>
            </div>
    );
    }
}

export default IngredientPanel;

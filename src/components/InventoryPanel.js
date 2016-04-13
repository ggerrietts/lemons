import React, { Component, PropTypes } from 'react';

class InventoryPanel extends Component {
    render() {
        return (
            <div id="inventory" className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Prepared Inventory</h3>
                </div>
                <div className="panel-body">
                2 Pitchas of Lemonade
                </div>
            </div>
    );
    }
}

export default InventoryPanel;

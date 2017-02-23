import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const LedgerPanel = ({startingBalance, totalCost, totalSales, currentBalance}) => (
    <div id="ledger" className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">Ledger</h3>
        </div>
        <table className="table">
            <tbody>
            <tr>
                <td>Starting Cash:</td>
                <td>${ startingBalance.toFixed(2) }</td>
            </tr>
            <tr>
                <td>Expenses:</td>
                <td>${ totalCost.toFixed(2) }</td>
            </tr>
            <tr>
                <td>Sales:</td>
                <td>${ totalSales.toFixed(2) }</td>
            </tr>
            <tr>
                <td>Ending Cash:</td>
                <td>${ currentBalance.toFixed(2) }</td>
            </tr>
            </tbody>
        </table>
    </div>
);

LedgerPanel.propTypes = {
  startingBalance: PropTypes.number.isRequired,
  currentBalance: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  totalSales: PropTypes.number.isRequired
};


const mapStateToProps = (state) => {
    return {...state.lemons.get('ledger').toJS()};
}


export const LedgerPanelContainer = connect(mapStateToProps)(LedgerPanel);


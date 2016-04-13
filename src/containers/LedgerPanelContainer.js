import { connect } from 'react-redux';
import LedgerPanel from '../components/LedgerPanel.js';



const mapStateToProps = (state) => {
    return {...state.ledger.toJS()};
}


const LedgerPanelContainer = connect(mapStateToProps)(LedgerPanel);

export default LedgerPanelContainer;

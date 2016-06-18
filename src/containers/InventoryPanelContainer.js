import { connect } from 'react-redux';
import { toJS } from 'immutable';
import { inventoryDisplaySelector } from '../selectors.js';
import InventoryPanel from '../components/InventoryPanel.js';

// import { purchase } from '../actions/ingredientActions.js';

const mapStateToProps = (state) => {
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

const InventoryPanelContainer = connect(mapStateToProps)(InventoryPanel);
// const IngredientPanelContainer = connect(mapStateToProps, mapDispatchToProps)(IngredientPanel);
// 
export default InventoryPanelContainer;

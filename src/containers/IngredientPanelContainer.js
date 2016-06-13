import { connect } from 'react-redux';
import IngredientPanel from '../components/IngredientPanel.js';

import { purchase } from '../actions/ingredientActions.js';

const mapStateToProps = (state) => {
    return {ingredients: state.lemons.get('ingredients').toJS()};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseClick: (kind) => {
      dispatch(purchase(kind))
    }
  }
}

const IngredientPanelContainer = connect(mapStateToProps, mapDispatchToProps)(IngredientPanel);

export default IngredientPanelContainer;

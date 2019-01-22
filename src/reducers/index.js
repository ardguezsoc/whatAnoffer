import { combineReducers } from 'redux';
import ProductFormReducer from './ProductFormReducer';

export default combineReducers({
    productForm: ProductFormReducer
});  
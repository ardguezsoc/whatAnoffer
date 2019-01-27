import { combineReducers } from 'redux';
import ProductFormReducer from './ProductFormReducer';
import ProductReducer from './ProductReducer';


export default combineReducers({
    productForm: ProductFormReducer,
    product: ProductReducer
});  
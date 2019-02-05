import { combineReducers } from 'redux';
import ProductFormReducer from './ProductFormReducer';
import ProductReducer from './ProductReducer';
import KindReducer from './KindReducer';
import PlaceReducer from './PlaceReducer';


export default combineReducers({
    productForm: ProductFormReducer,
    product: ProductReducer,
    kindP: KindReducer,
    place: PlaceReducer
});  
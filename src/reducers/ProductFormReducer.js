import {PRODUCT_UPDATE, PRODUCT_CREATE} from '../actions/type';
import { today } from '../actions';

const INITIAL_STATE = { description: '',  priceOld: '0.00', priceNew: '0.00', date: today() }

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case PRODUCT_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
        
        case PRODUCT_CREATE: 
        return INITIAL_STATE;

        default:
         return state;
    }


}
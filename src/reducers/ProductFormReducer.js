import {PRODUCT_UPDATE, PRODUCT_CREATE} from '../actions/type';

const INITIAL_STATE = { description: '',  priceOld: '0.00', priceNew: '0.00', date: '22/01/2018' }

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
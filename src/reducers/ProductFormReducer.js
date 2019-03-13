import {PRODUCT_UPDATE, PRODUCT_CREATE} from '../actions/type';

const INITIAL_STATE = {  date: "", description: "" }

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
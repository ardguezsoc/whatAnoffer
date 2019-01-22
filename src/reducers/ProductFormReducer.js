import {PRODUCT_UPDATE} from '../actions/type';

const INITIAL_STATE = {title: '', description: '' }

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case PRODUCT_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
        
        default:
         return state;
    }


}
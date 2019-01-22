import {PRODUCT_UPDATE} from './type';

export const productUpdate = ({ prop, value}) => {
    console.log(value);
    return {
        type: PRODUCT_UPDATE,
        payload: { prop, value }
    };
};
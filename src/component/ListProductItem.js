import React, {Component} from 'react';
import { CardItem } from './cardItem';

class ListProductItem extends Component {
    render(){
        const { title, price } = this.props.product;
        
    return(
        <CardItem title = {title} price = {price} />
        );

    }
    
}

export default ListProductItem;
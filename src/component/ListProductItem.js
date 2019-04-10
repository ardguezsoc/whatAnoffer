import React, { Component } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { CardItem } from "../component";
import { Actions } from "react-native-router-flux";

class ListProductItem extends Component {
  onItemPress() {
    Actions.productView({ product: this.props.product });
  }

  render() {
    const { productValue, priceNew, priceOld, placeValue, date, urlOfImag, likes, saved } = this.props.product;
    
    return (
      <View >
      <TouchableNativeFeedback onPress={ this.onItemPress.bind(this)} >
        <View>
          <CardItem 
          title={ productValue } 
          priceNew = { priceNew } 
          priceOld = { priceOld } 
          address = { placeValue } 
          dateProd = { date } 
          urlImag = { urlOfImag }
          likes = {likes}
          saved = {saved}
          uidUser = {this.props.uidUser}
          /> 
        </View>
      </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ListProductItem;

import React, { Component } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { CardItem } from "./CardItem";
import { Actions } from "react-native-router-flux";

class ListProductItem extends Component {
  onItemPress() {
    Actions.productView({ product: this.props.product });
  }

  render() {
    const { title, price, date } = this.props.product;

    return (
      <View >
      <TouchableNativeFeedback onPress={ this.onItemPress.bind(this)} >
        <View>
          <CardItem title={ title } price={ price }  />
        </View>
      </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ListProductItem;

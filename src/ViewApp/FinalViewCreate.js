import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, CardContainer } from "../component";
import ProductForm from "./ProductForm";
import { productUpdate, productCreate, today, nowHour } from "../actions";
import { connect } from "react-redux";

class FinalViewCreate extends Component {
  onButtonPress() {
    const { productValue,  placeValue, productKindValue, description, date,  priceOld, priceNew } = this.props;
    const currentTime = today() + " " + nowHour();
    this.props.productCreate({
    placeValue,
    productValue,
    productKindValue,
    description,
    date,
    priceOld,
    priceNew,
    currentTime
    });
  }

  render() {
    return (
      <View>
        <ProductForm {...this.props} />
        <CardContainer>
          <Button onPress={this.onButtonPress.bind(this)}>Crear oferta</Button>
        </CardContainer>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {  description, date,  priceOld, priceNew, address, productName } = state.productForm;

  return {  description, date, priceOld, priceNew, address, productName };
};

export default connect(
  mapStateToProps,
  { productUpdate, productCreate }
)(FinalViewCreate);

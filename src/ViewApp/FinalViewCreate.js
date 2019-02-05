import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, CardContainer } from "../component";
import ProductForm from "./ProductForm";
import { productUpdate, productCreate, today, nowHour } from "../actions";
import { connect } from "react-redux";

class FinalViewCreate extends Component {
  onButtonPress() {
    const { title, description, date, kind, price } = this.props;
    const currentTime = today() + " " + nowHour();
    this.props.productCreate({
      title,
      description,
      date,
      kind,
      price,
      currentTime
    });
  }

  render() {
    return (
      <View>
          <Text>{this.props.placeValue}</Text>
          <Text>{this.props.productValue}</Text>
        <ProductForm {...this.props} />
        <CardContainer>
          <Button onPress={this.onButtonPress.bind(this)}>Crear oferta</Button>
        </CardContainer>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { title, description, date, kind, price } = state.productForm;

  return { title, description, date, kind, price };
};

export default connect(
  mapStateToProps,
  { productUpdate, productCreate }
)(FinalViewCreate);

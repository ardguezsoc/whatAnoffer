import React, { Component } from "react";
import { View } from "react-native";
import { Button, CardContainer } from "../component";
import ProductForm from "./ProductForm";
import { productUpdate, productCreate, today, nowHour} from "../actions";
import { connect } from "react-redux"


class CreateOffer extends Component {
  
  onButtonPress() {
    const { title, description, date, kind, price } = this.props;
    const currentTime = today() + " " + nowHour()
    this.props.productCreate({ title, description, date, kind, price, currentTime });

  }

  render() {
    return (
      <View>
        <ProductForm {...this.props} />
        <CardContainer>
          <Button onPress={this.onButtonPress.bind(this)}>
            Crear oferta
          </Button>
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
)(CreateOffer);

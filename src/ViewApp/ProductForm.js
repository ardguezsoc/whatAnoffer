import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { Input } from "../component/Input";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { DatePick } from "../component/DatePicker";
import { productUpdate } from "../actions";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "21-01-2019" };
  }
  render() {
    return (
      <View>
        <Input
          label="Producto"
          editable={false}
          value={this.props.productValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "productName", value })
          }
        />

        <Input
          label="Tipo de producto"
          editable={false}
          value={this.props.productKindValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "kindOfProduct", value })
          }
        />

        <Input
          label="Dirección"
          editable={false}
          value={this.props.placeValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "address", value })
          }
        />

        <Input
          label="Descripción"
          placeholder="Breve descipción de la oferta"
          value={this.props.description}
          onChangeText={value =>
            this.props.productUpdate({ prop: "description", value })
          }
        />

        <View>
          <DatePick
            value={this.props.date}
            onDateChange={value =>
              this.props.productUpdate({ prop: "date", value })
            }
            dateDefault="22/01/2019"
          />
        </View>

        <Input
          label="Precio original"
          placeholder="0.00€"
          keyboard="numeric"
          value={this.props.price}
          onChangeText={value =>
            this.props.productUpdate({ prop: "priceOld", value })
          }
        />
        <Input
          label="Precio actual"
          placeholder="0.00€"
          keyboard="numeric"
          value={this.props.price}
          onChangeText={value =>
            this.props.productUpdate({ prop: "priceNew", value })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { description, priceOld, priceNew, kind, date } = state.productForm;

  //return show as prop
  return { description, priceOld, priceNew, kind, date };
};

export default connect(
  mapStateToProps,
  { productUpdate }
)(ProductForm);

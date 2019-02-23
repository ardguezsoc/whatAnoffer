import React, { Component } from "react";
import { View } from "react-native";
import { Input } from "../component/Input";
import { connect } from "react-redux";
import { DatePick } from "../component/DatePicker";
import { productUpdate, today } from "../actions";

class ProductForm extends Component {
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
          multiline={true}
          numberOfLines = {4}
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
             dateDefault = {today()}
          />
        </View>

        <Input
          label="Precio original"
          placeholder="0.00€"
          keyboard="numeric"
          value={this.props.priceOld}
          onChangeText={value =>
            this.props.productUpdate({ prop: "priceOld", value })
          }
        />

        <Input
        label="Precio actual"
        placeholder="0.0€"
        keyboard="numeric"
        value={this.props.priceNew}
        onChangeText= {value => this.props.productUpdate({prop: "priceNew", value})}
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

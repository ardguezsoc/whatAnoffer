import React, { Component } from "react";
import { View } from "react-native";
import { Input } from "../component";
import { connect } from "react-redux";
import { DatePick } from "../component/DatePicker";
import { productUpdate } from "../actions";

class ProductForm extends Component {
  render() {
    return (
      <View>
        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          iconData="product"
          editable={false}
          value={this.props.productValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "productName", value })
          }
        />

        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          iconData="complex"          
          editable={false}
          value={this.props.productKindValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "kindOfProduct", value })
          }
        />

        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          iconData="address"          
          editable={false}
          value={this.props.placeValue}
          onChangeText={value =>
            this.props.productUpdate({ prop: "address", value })
          }
        />

        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          iconData="description"
          placeholder="Breve descipción de la oferta"
          value={this.props.description}
          multiline={true}
          numberOfLines={1}
          onChangeText={value =>
            this.props.productUpdate({ prop: "description", value })
          }
        />

        <View>
          <DatePick
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
            value={this.props.date}
            onDateChange={value =>
              this.props.productUpdate({ prop: "date", value })
            }
          />
        </View>

        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          iconData="billet"
          placeholder="Precio original"
          keyboard="numeric"
          value={this.props.priceOld}
          onChangeText={value =>
            this.props.productUpdate({ prop: "priceOld", value })
          }
        />

        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          placeholder="Precio actual"
          iconData="coins"
          keyboard="numeric"
          value={this.props.priceNew}
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

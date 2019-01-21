import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { Input } from "../component/Input";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { CardItem } from "../component";

class ProductForm extends Component {
  render() {
    return (
      <View>
       <Input />
       <Input />

      </View>
    );
  }
}

export default ProductForm;

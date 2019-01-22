import React from "react";
import { TextInput, View, Text } from "react-native";

const Input = ({label, placeholder,keyboard, value, onChangeText}) => {
    const {inputStyle, labelStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput 
      style={inputStyle} 
      placeholder={placeholder} 
      autoCorrect={false} 
      keyboardType={keyboard}
      value={value}
      onChangeText = { onChangeText }
      />
    </View>
  );
};
const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 2,
    fontSize: 14,
    lineHeight: 30,
    flex: 3
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 10,
    flex: 1
  },
  viewStyle: {
    flexDirection: "row",
    alignItems: "center"
  }
};

export {Input};
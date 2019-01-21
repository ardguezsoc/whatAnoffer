import React from "react";
import { TextInput, View, Text } from "react-native";

const Input = () => {
    const {inputStyle, labelStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={labelStyle}>Label</Text>
      <TextInput style={inputStyle} placeholder="Place holder" autoCorrect={false} />
    </View>
  );
};
const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 2,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  viewStyle: {
    flexDirection: "row",
    alignItems: "center"
  }
};

export {Input};
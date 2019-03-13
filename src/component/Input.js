import React from "react";
import { TextInput, View, Text } from "react-native";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";

function renderIcon(iconData) {
  switch (iconData) {
    case "coins":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAS}
        >
          {Icons.coins}
        </FontAwesome>
      );
    case "billet":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAS}
        >
          {Icons.moneyBillWave}
        </FontAwesome>
      );

    case "address":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAS}
        >
          {Icons.mapMarkerAlt}
        </FontAwesome>
      );

    case "Carne y Pescado":
      return (
        <FontAwesome style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}>
          {Icons.fish}
        </FontAwesome>
      );

    case "Frutas & Vegetales":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAB}
        >
          {Icons.apple}
        </FontAwesome>
      );

    case "Dulces":
      return (
        <FontAwesome style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}>
          {Icons.cookie}
        </FontAwesome>
      );

    case "Lácteos":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAB}
        >
          {Icons.gulp}
        </FontAwesome>
      );

    case "Bebidas":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAS}
        >
          {Icons.glassMartiniAlt}
        </FontAwesome>
      );

    case "description":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAS}
        >
          {Icons.fileSignature}
        </FontAwesome>
      );

    case "product":
      return (
        <FontAwesome
          style={{ fontSize: 26, paddingLeft: 10, flex: 1, color:"#747474" }}
          type={IconTypes.FAB}
        >
          {Icons.productHunt}
        </FontAwesome>
      );

    default:
      return null;
  }
}

const Input = ({
  placeholder,
  keyboard,
  value,
  onChangeText,
  editable,
  multiline,
  numberOfLines,
  styleReceived,
  iconData
}) => {
  const { inputStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      {iconData == "complex" ? renderIcon(value) : renderIcon(iconData)}

      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[inputStyle, styleReceived]}
        placeholder={placeholder}
        editable={editable}
        autoCorrect={false}
        keyboardType={keyboard}
        value={value}
        onChangeText={onChangeText}
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

export { Input };

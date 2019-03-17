import React from "react";
import { View } from "react-native";

const CardContainer = (props) => {
  return (
  <View style={[ styles.containerStyle, props.style ]}>{props.children}</View>
    );
};

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};

export {CardContainer};

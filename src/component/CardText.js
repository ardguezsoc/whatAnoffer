import React from "react";
import { View, Text } from "react-native";


const CardText = (props) => {
  
  return (
  <View style={styles.containerStyle}>
  <Text style={[props.style, styles.textStyle]} >{props.text} {props.value}</Text>

  </View>
    );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderColor: "#ddd",
  },
  textStyle:{
    fontSize: 18
  }
};

export {CardText};

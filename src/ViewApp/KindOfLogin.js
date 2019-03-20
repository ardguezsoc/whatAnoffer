import React, { Component } from "react";
import { Button } from "react-native-elements";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";

class KindOfLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonStatus: false
    };
  }
  render() {
    const { buttonS, textS } = styles;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#30A66D",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Pacifico",
            fontWeight: "200",
            fontSize: 60,
            textShadowColor: "rgba(0, 0, 0, 0.50)",
            textShadowOffset: { width: -2, height: 2 },
            textShadowRadius: 10
          }}
        >
          WAO!
        </Text>

        <View
          style={{
            width: "90%",
            height: "75%",
            justifyContent: "center",
            aligItems: "center",
            alignSelf: "center"
          }}
        >
          <Button
            title="Acceder como anónimo"
            buttonStyle={buttonS}
            textStyle={[textS,{color: "black"}]}
            onPress={ () => Actions.noUserLogin()}
          />
          <Button
            title="Acceder con mi cuenta"
            buttonStyle={[buttonS,{backgroundColor:"#109C59"}]}
            textStyle={[textS,{color:"white"}]}
            onPress={() => Actions.Login()}
          />
          <Button title="Registrarse" buttonStyle={buttonS} textStyle={textS} onPress={ () => Actions.newUser()} />
        </View> 
      </View>
    );
  }
}

const styles = {
  textS: {
    color: "#109C59",
    fontFamily: "Roboto",
    fontSize: 21
  },
  buttonS: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 40,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5
  }
};

export default KindOfLogin;

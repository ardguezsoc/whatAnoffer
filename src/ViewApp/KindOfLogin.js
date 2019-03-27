import React, { Component } from "react";
import { Button } from "react-native-elements";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Actions } from "react-native-router-flux";

class KindOfLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonStatus: false,
      loading: true
    };
  }

  componentDidMount() {
    this.displayData()
  }

  displayData = async () => {
    try{
      let user = await AsyncStorage.getItem('user');
      firebase
      .auth()
      .signInWithEmailAndPassword(JSON.parse(user).email, JSON.parse(user).password).then( () =>  {Actions.waoTab()} )
    }catch(err){
      this.setState({loading: false})

    }
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
          style={styles.titleStyle}
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
        { this.state.loading ? <ActivityIndicator color="white" size="large" /> : 
        <View>
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
      }
          
        </View> 
      </View>
    );
  }
}

const styles = {
  textS: {
    color: "#109C59",
    fontFamily: "Semib",
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
  },
  titleStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Pacifico",
    fontWeight: "200",
    fontSize: 60,
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  }
};

export default KindOfLogin;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import {
  emailChanged,
  passwordChanged,
  loginUser,
  reseterLogin
} from "../actions";
import { View, Text, ActivityIndicator } from "react-native";
import { Input, ButtonOwn, CardContainer } from "../component";
import { Actions } from "react-native-router-flux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonStatus: false
    };
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    this.setState({ buttonStatus: true });
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#30A66D",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: "80%",
            height: 400,
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: 15
          }}
        >
          <View
            style={{
              width: "100%",
              height: "15%",
              justifyContent: "center",
              marginTop: 15
            }}
          >
            <Text
              style={{
                color: "#30A66D",
                textAlign: "center",
                fontFamily: "Pacifico",
                fontWeight: "200",
                fontSize: 35
              }}
            >
              WAO!
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              height: "75%",
              justifyContent: "center",
              aligItems: "center",
              alignSelf: "center"
            }}
          >
            <Text style={styles.errorTextStyle}>{this.props.error}</Text>
            <Input
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              placeholder="Correo electrónico"
              styleReceived={styles.inputStyle}
            />
            <Input
              secureTextEntry
              placeholder="Contraseña"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              styleReceived={styles.inputStyle}
            />

            {!this.props.load ? (
              <CardContainer>
                <ButtonOwn
                  style={{
                    borderColor: "#0E9353",
                    borderWidth: 1.5,
                    marginBottom: 10,
                    marginTop: 5
                  }}
                  onPress={this.onButtonPress.bind(this)}
                >
                  <Text style={{ color: "#20A66D" }}>Iniciar sesión</Text>
                </ButtonOwn>
              </CardContainer>
            ) : (
              <View style={{ width: "100%", height: 70, alignItems: "center" }}>
                <ActivityIndicator size="large" />
              </View>
            )}
            <View
              style={{
                textAlign: "center",
                width: "90%",
                alignSelf: "center",
                flex: 1
              }}
            >
              <View style={{ textAlign: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Pacifico"
                  }}
                >
                  O
                </Text>
              </View>
              <View style={{ flex:1, marginTop: 15 }}>
                <Button
                  title="Crear una cuenta"
                  buttonStyle={{ backgroundColor: "#0A874B", borderRadius: 5 }}
                  titleStyle={{
                    fontSize: 11,
                    fontFamily: "Pacifico"
                  }}
                  onPress={() => this.props.reseterLogin()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 10,
    flex: 1,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2
  },
  errorTextStyle: {
    color: "red",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, load } = auth;

  return { email, password, error, load };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser, reseterLogin }
)(Login);

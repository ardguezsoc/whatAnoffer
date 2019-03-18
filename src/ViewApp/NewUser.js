import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { emailChanged, passwordChanged, nameChanged, createAccount, reseter } from "../actions";
import { View, Text, ActivityIndicator } from "react-native";
import { Input } from "../component";
import { Icon } from "react-native-elements";

class newUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonStatus: false
    };
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    this.setState({ buttonStatus: true });
    const { email, password, name } = this.props;
    this.props.createAccount({ email, password, name });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#30A66D"
        }}
      >
        <View
          style={{
            backgroundColor: "#30A66D",
            justifyContent: "flex-start",
            height: "20%"
          }}
        >
          <Icon
            reverse
            size={21}
            name="chevron-left"
            type="font-awesome"
            color="#30A66D"
            onPress={() => this.props.reseter() }
          />
        </View>
        <View
          style={{
            width: "80%",
            height: "60%",
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: 15,
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
              onChangeText={this.onNameChange.bind(this)}
              value={this.props.name}
              placeholder="Nombre"
              styleReceived={styles.inputStyle}
            />
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
              <View style={{ height: 50, width: "100%", marginTop: 15 }}>
                <Button
                  title="Crear cuenta"
                  buttonStyle={{
                    backgroundColor: "#0A874B",
                    borderRadius: 5
                  }}
                  titleStyle={{
                    fontSize: 11,
                    fontFamily: "Pacifico"
                  }}
                  onPress={this.onButtonPress.bind(this)}
                />
              </View>
            ) : (
              <View style={{ width: "100%", height: 70, marginTop: 20, alignItems: "center" }}>
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
            />
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
    fontSize: 17,
    alignSelf: "center",
    marginBottom: 5
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, name, error, load } = auth;

  return { email, password, name, error, load };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, nameChanged, createAccount, reseter }
)(newUser);

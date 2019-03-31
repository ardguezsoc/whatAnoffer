import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator
} from "react-native";
import _ from "lodash";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Input, ButtonOwn, CardContainer } from "../component";
import { productUpdate, uploadFile, profileEdit } from "../actions";
import ImagePicker from "react-native-image-picker";
import Modal from "react-native-modal";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfUsuario: this.props.nameOfUsr,
      uriOfUsuario: this.props.uriProfile,
      fileToImage: "",
      buttonStatus: false,
      modalStatus: false
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    var options = {
      title: "Seleccione la nueva foto",
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          fileToImage: response,
          uriOfUsuario: { uri: response.uri }
        });
      }
    });
  }

  onAccept() {
    this.setState({ modalStatus: false});
    this.onButtonPress();
  }
  onDecline() {
    this.setState({ modalStatus: false });
  }

  onButtonPress() {
    this.setState({ buttonStatus: true });
    const nameValue = this.state.nameOfUsuario;
    const uid = this.props.uidUser
    if (this.state.uriOfUsuario != this.props.uriProfile) {
      uploadFile(this.state.fileToImage)
        .then(response => response.json())
        .then(result => {
          const uriValue = result.secure_url;
          this.props.profileEdit({
            uriValue,
            nameValue,
            uid
          });
        });
    } else {
      const uriValue = this.props.uriProfile;
      this.props.profileEdit({
        uriValue,
        nameValue,
        uid
      });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
        <Input
          styleReceived={{ borderBottomColor: "#cfdbe2", borderBottomWidth: 1 }}
          value={this.state.nameOfUsuario}
          placeholder="Nombre de Usuario"
          onChangeText={text => this.setState({ nameOfUsuario: text })}
        />
        <TouchableOpacity
          onPress={this.submit}
          style={{
            height: 110,
            width: 110,
            borderRadius: 40,
            marginBottom: 20,
            marginTop: 20
          }}
        >
          {this.state.uriOfUsuario != this.props.uriProfile ? (
            <Image
              source={this.state.uriOfUsuario}
              style={{ height: 80, width: 80, borderRadius: 40 }}
            />
          ) : (
            <Image
              source={{ uri: this.state.uriOfUsuario }}
              style={{ height: 80, width: 80, borderRadius: 40 }}
            />
          )}
        </TouchableOpacity>
        <CardContainer>
          {this.state.buttonStatus ? (
            <ActivityIndicator size="large" color="#30A66D" />
          ) : (
            <ButtonOwn
              style={{ borderColor: "#30A66D" }}
              onPress={() =>
                this.setState({ modalStatus: !this.state.modalStatus })
              }
            >
              <Text style={{ color: "#30A66D" }}>Guardar Cambios</Text>
            </ButtonOwn>
          )}
        </CardContainer>

        <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.modalStatus}
            onBackButtonPress={() => this.onDecline()}
            onBackdropPress={() => this.onDecline()}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "40%",
                borderRadius: 15
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <View style={{ alignSelf: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pacifico",
                    fontSize: 24,
                    color: "#30A66D"
                  }}
                >
                  ¿Seguro?
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10
                  }}
                >
                  ¿Quieres guardar los cambios realizados?
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Button
                    title="Cancelar"
                    onPress={() => this.onDecline()}
                    buttonStyle={{
                      borderRadius: 15,
                      width: 120,
                      backgroundColor: "#ff3333"
                    }}
                  />
                  <Button
                    title="Aceptar"
                    onPress={() => this.onAccept()}
                    buttonStyle={{
                      backgroundColor: "#109C59",
                      borderRadius: 15,
                      width: 120
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { productUpdate, profileEdit, uploadFile }
)(EditProfile);

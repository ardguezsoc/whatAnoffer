import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Switch
} from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import { Input, ButtonOwn, CardContainer, MyModal } from "../component";
import {
  productUpdate,
  uploadFile,
  profileEdit,
  notificationFetch
} from "../actions";
import ImagePicker from "react-native-image-picker";
import { Actions } from "react-native-router-flux";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfUsuario: this.props.nameOfUsr,
      uriOfUsuario: this.props.uriProfile,
      fileToImage: "",
      buttonStatus: false,
      modalStatus: false,
      status: false,
      data: ""
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.notificationFetch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.status,
      data: nextProps.uid
    });
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
    this.setState({ modalStatus: false });
    this.onButtonPress();
  }
  onDecline() {
    this.setState({ modalStatus: false });
  }

  onButtonPress() {
    this.setState({ buttonStatus: true });
    const nameValue = this.state.nameOfUsuario;
    const uid = this.props.uidUser;
    if (this.state.uriOfUsuario != this.props.uriProfile) {
      uploadFile(this.state.fileToImage)
        .then(response => response.json())
        .then(result => {
          const uriValue = result.secure_url;
          this.props.profileEdit(
            {
              uriValue,
              nameValue,
              uid
            },
            this.state.status
          );
        });
    } else {
      const uriValue = this.props.uriProfile;
      this.props.profileEdit(
        {
          uriValue,
          nameValue,
          uid
        },
        this.state.status
      );
    }
  }

  render() {
    if (this.state.data == "") {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View
          style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}
        >
          <Input
            styleReceived={{
              borderBottomColor: "#cfdbe2",
              borderBottomWidth: 1
            }}
            value={this.state.nameOfUsuario}
            placeholder="Nombre de Usuario"
            onChangeText={text => this.setState({ nameOfUsuario: text })}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderBottomColor: "#cfdbe2",
              borderBottomWidth: 1,
              width: "100%"
            }}
            onPress={() => {
              this.setState({
                status: !this.state.status
              });
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginBottom: 8,
                fontSize: 15,
                marginLeft: 5
              }}
            >
              Notificaciones
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginRight: 10
              }}
            >
              <Switch
                value={this.state.status}
                thumbColor="#52BA88"
                trackColor="#d3d3d3"
                onValueChange={() => {
                  this.setState({
                    status: !this.state.status
                  });
                }}
                style={{ marginTop: 4 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderBottomColor: "#cfdbe2",
              borderBottomWidth: 1,
              width: "100%"
            }}
            onPress={() =>
              Actions.editNotif({
                topicsArray: Object.values(this.props.topics)
              })
            }
          >
            <Text
              style={{
                marginTop: 10,
                marginBottom: 8,
                fontSize: 15,
                marginLeft: 5
              }}
            >
              Editar preferencias de notificaciones
            </Text>
          </TouchableOpacity>
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
          <MyModal
            modalStatus={this.state.modalStatus}
            Decline={() => this.onDecline()}
            title="¿Seguro?"
            subTitle="¿Quieres guardar los cambios realizados?"
            Accept={() => this.onAccept()}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const { status, topics, uid } = state.notif;

  return {
    status,
    topics,
    uid
  };
};

export default connect(
  mapStateToProps,
  { productUpdate, profileEdit, uploadFile, notificationFetch }
)(EditProfile);

import React, { Component } from "react";
import { View, Text } from "react-native";
import { CardProductView, CardText } from "../component";
import { productUpdate, productDelete, profileFetch } from "../actions";
import _ from "lodash";
import { Button, Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { ButtonOwn } from "../component";
import { Actions } from "react-native-router-flux";
import firebase from "@firebase/app"
import "@firebase/auth";

class ProductView extends Component {
  state = { modalStatus: false, imgUrl: this.props.product.urlOfImag, firebaseAuth: firebase.auth().currentUser.uid };

  componentWillMount() {
    this.props.profileFetch(this.props.product.owner);
  }

  resetCancel() {
    this.setState({
      modalStatus: false
    });
  }

  editOffer() {
    Actions.editView({ product: this.props.product });
  }

  onAccept() {
    this.setState({ modalStatus: false });
    const { uid } = this.props.product;
    this.props.productDelete({ uid });
  }

  render() {
    return (
      <View>
        <View style={{ height: "30%", width: "100%" }}>
          <CardProductView
            imagUrl={this.state.imgUrl}
            uriAvatar={this.props.uriPhoto}
            nameOfUsr={this.props.nameOfUser}
            ownerProduct={this.props.product.owner}
            authUser = {this.state.firebaseAuth}
          />
        </View>
        <View style={{ backgroundColor: "white", height: "70%" }}>
          {this.props.product.owner == this.state.firebaseAuth ? (
            <View
              style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}
            >
              <ButtonOwn
                onPress={() => this.editOffer()}
                style={{ borderColor: "#086BC5" }}
              >
                <Text style={{ color: "#086BC5" }}>Editar</Text>
              </ButtonOwn>
              <ButtonOwn
                onPress={() =>
                  this.setState({ modalStatus: !this.state.modalStatus })
                }
                style={{ borderColor: "#E31616" }}
              >
                <Text style={{ color: "#E31616" }}> Eliminar </Text>
              </ButtonOwn>
            </View>
          ) : null}

          <View style={{ marginTop: "4%" }}>
            <CardText
              style={{ justifyContent: "center", alignSelf: "center" }}
              value={this.props.product.productValue}
            />
            {this.props.product.priceNew == "n/a" ? (
              <CardText text="Precio:" value={this.props.product.priceNew} />
            ) : (
              <CardText
                text="Precio:"
                value={`${this.props.product.priceNew}€`}
              />
            )}

            <CardText
              text="Consumir pref antes del"
              value={this.props.product.date}
            />
            <CardText
              text="Tipo:"
              value={this.props.product.productKindValue}
            />
            <CardText value={this.props.product.description} />
            <CardText text="Dirección:" value={this.props.product.placeValue} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.modalStatus}
            onBackButtonPress={() => this.resetCancel()}
            onBackdropPress={() => this.resetCancel()}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "30%",
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
                    color: "#ff3333"
                  }}
                >
                  Eliminar
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10
                  }}
                >
                  ¿Quieres eliminar esta oferta?
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Button
                    title="Cancelar"
                    onPress={() => this.resetCancel()}
                    buttonStyle={{
                      borderRadius: 15,
                      width: 120
                    }}
                  />
                  <Button
                    title="Aceptar"
                    onPress={() => this.onAccept()}
                    buttonStyle={{
                      borderRadius: 15,
                      width: 120,
                      backgroundColor: "#ff3333"
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

const mapStateToProps = state => {
  const { title, priceNew } = state.product;
  const { nameOfUser, uriPhoto } = state.profile;
  return { title, priceNew, nameOfUser, uriPhoto };
};

export default connect(
  mapStateToProps,
  { productUpdate, productDelete, profileFetch }
)(ProductView);

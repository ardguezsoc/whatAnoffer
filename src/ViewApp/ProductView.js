import React, { Component } from "react";
import { View, Text } from "react-native";
import { CardProductView, CardText } from "../component";
import {
  productUpdate,
  productDelete,
  profileFetch,
  likeOffer,
  dislikeOffer,
  saveOffer,
  unSaveOffer
} from "../actions";
import _ from "lodash";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { ButtonOwn } from "../component";
import { Actions } from "react-native-router-flux";
import firebase from "@firebase/app";
import "@firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ProductView extends Component {
  state = {
    modalStatus: false,
    imgUrl: this.props.product.urlOfImag,
    firebaseAuth: firebase.auth().currentUser.uid,
    likeStatus: false,
    saveStatus: false
  };

  componentWillMount() {
    this.props.profileFetch(this.props.product.owner);
    this.setState({
      likeStatus: _.includes(
        this.props.product.likes,
        this.state.firebaseAuth,
        0
      ),
      saveStatus: _.includes(
        this.props.product.saved,
        this.state.firebaseAuth,
        0
      )
    });
  }

  resetCancel() {
    this.setState({
      modalStatus: false
    });
  }

  editOffer() {
    Actions.editView({ product: this.props.product });
  }

  doLike() {
    const { uid } = this.props.product;
    this.props.likeOffer({ uid }, this.state.firebaseAuth);
    this.setState({ likeStatus: !this.state.likeStatus });
  }

  dontLike() {
    const { uid } = this.props.product;
    this.props.dislikeOffer({ uid }, this.state.firebaseAuth);
    this.setState({ likeStatus: !this.state.likeStatus });
  }

  save(checkV) {
    const { uid } = this.props.product;
    if (checkV) {
      this.props.saveOffer({ uid }, this.state.firebaseAuth);
    } else {
      this.props.unSaveOffer({ uid }, this.state.firebaseAuth);
    }
    this.setState({ saveStatus: !this.state.saveStatus });
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
            authUser={this.state.firebaseAuth}
          />
        </View>
        <View style={{ backgroundColor: "white", height: "70%" }}>
          <View style={{ marginTop: 10, marginLeft: 8, flexDirection: "row" }}>
            {!this.state.likeStatus ? (
              <Icon
                name="heart"
                color="grey"
                size={27}
                onPress={() => this.doLike()}
              />
            ) : (
              <Icon
                name="heart"
                color="#ED4956"
                size={27}
                onPress={() => this.setState(() => this.dontLike())}
              />
            )}

            {this.state.saveStatus ? (
              <Icon
                name="cart"
                color="green"
                size={27}
                style={{ marginLeft: 20 }}
                onPress={() => this.save(false)}
              />
            ) : (
              <Icon
                name="cart"
                color="grey"
                size={27}
                style={{ marginLeft: 20 }}
                onPress={() => this.save(true)}
              />
            )}
          </View>
          {this.props.product.owner == this.state.firebaseAuth ? (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
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

          <View>
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
  {
    productUpdate,
    productDelete,
    profileFetch,
    likeOffer,
    dislikeOffer,
    saveOffer,
    unSaveOffer
  }
)(ProductView);

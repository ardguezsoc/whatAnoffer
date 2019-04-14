import React, { Component } from "react";
import {  View } from "react-native";
import { CardItem } from "../component";
import { likeOffer, dislikeOffer, saveOffer, unSaveOffer } from "../actions";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import firebase from "@firebase/app";
import "@firebase/auth";

class ListProductItem extends Component {
 
  state = {
    firebaseAuth: firebase.auth().currentUser.uid
  };

  onItemPress() {
    Actions.productView({ product: this.props.product });
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

  render() {
    const {
      productValue,
      priceNew,
      priceOld,
      placeValue,
      date,
      urlOfImag,
      likes,
      saved
    } = this.props.product;

    return (
      <View>
          <View>
            <CardItem
              title={productValue}
              priceNew={priceNew}
              priceOld={priceOld}
              address={placeValue}
              dateProd={date}
              urlImag={urlOfImag}
              likes={likes}
              saved={saved}
              uidUser={this.props.uidUser}
              onLike={() => this.doLike()}
              onDislike={ () => this.dontLike()}
              saveOff={() => this.save(true)}
              unSaveOff={ () => this.save(false)}
              pressItem = {this.onItemPress.bind(this)}
            />
          </View>
      </View>
    );
  }
}

export default connect(
  null,
  {
    likeOffer,
    dislikeOffer,
    saveOffer,
    unSaveOffer
  }
)(ListProductItem);

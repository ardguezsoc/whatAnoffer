import React, { Component } from "react";
import { View } from "react-native";
import { CardItem, CardItemIcons } from "../component";
import {
  likeOffer,
  dislikeOffer,
  saveOffer,
  unSaveOffer,
  nolikeOffer,
  removeNolikeOffer
} from "../actions";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import _ from "lodash";
import firebase from "@firebase/app";
import "@firebase/auth";

class ListProductItem extends Component {
  state = {
    firebaseAuth: firebase.auth().currentUser.uid,
    likeStatus: _.includes(
      this.props.product.likes,
      firebase.auth().currentUser.uid,
      0
    ),
    dislikeStatus: _.includes(
      this.props.product.dislikes,
      firebase.auth().currentUser.uid,
      0
    ),
    savedStatus: _.includes(
      this.props.product.saved,
      firebase.auth().currentUser.uid,
      0
    )
  };
  onItemPress() {
    if (typeof this.props.hideModal != "undefined") {
      this.props.hideModal();
    }
    Actions.productView({ product: this.props.product });
  }

  doLike(checkV) {
    const { uid, nStrikeDislikes, dislikes } = this.props.product;
    if (checkV) {
      this.props.likeOffer({ uid, nStrikeDislikes }, this.state.firebaseAuth);
    } else {
      this.props.dislikeOffer(
        { uid, nStrikeDislikes },
        this.state.firebaseAuth,
        _.size(dislikes)
      );
    }
    this.setState({ likeStatus: !this.state.likeStatus });
  }

  dislike(checkV) {
    const { uid, owner, nStrikeDislikes } = this.props.product;
    if (checkV) {
      this.props.nolikeOffer(
        { uid, owner, nStrikeDislikes },
        this.state.firebaseAuth
      );
    } else {
      this.props.removeNolikeOffer(
        { uid, owner, nStrikeDislikes },
        this.state.firebaseAuth
      );
    }
    this.setState({ dislikeStatus: !this.state.dislikeStatus });
  }

  save(checkV) {
    const { uid } = this.props.product;
    if (checkV) {
      this.props.saveOffer({ uid }, this.state.firebaseAuth);
    } else {
      this.props.unSaveOffer({ uid }, this.state.firebaseAuth);
    }
    this.setState({ savedStatus: !this.state.savedStatus });
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
      status,
      dislikes
    } = this.props.product;

    return (
      <View>
        <View>
          {!this.state.likeStatus && !this.state.dislikeStatus ? (
            <CardItem
              title={productValue}
              priceNew={priceNew}
              priceOld={priceOld}
              address={placeValue}
              dateProd={date}
              urlImag={urlOfImag}
              likes={likes}
              saved={this.state.savedStatus}
              onLike={() => this.doLike(true)}
              onDislike={() => this.doLike(false)}
              saveOff={() => this.save(true)}
              unSaveOff={() => this.save(false)}
              pressItem={this.onItemPress.bind(this)}
              onNolike={() => this.dislike(true)}
              statusOffer={status}
              dislikes={dislikes}
            />
          ) : (
            <CardItemIcons
              title={productValue}
              priceNew={priceNew}
              priceOld={priceOld}
              address={placeValue}
              dateProd={date}
              urlImag={urlOfImag}
              likeStat={this.state.likeStatus}
              likes={likes}
              saved={this.state.savedStatus}
              uidUser={this.props.uidUser}
              onDislike={() => this.doLike(false)}
              saveOff={() => this.save(true)}
              unSaveOff={() => this.save(false)}
              pressItem={this.onItemPress.bind(this)}
              onRemoveNolike={() => this.dislike(false)}
              statusOffer={status}
              dislikes={dislikes}
            />
          )}
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
    unSaveOffer,
    nolikeOffer,
    removeNolikeOffer
  }
)(ListProductItem);

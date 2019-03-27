import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { profileFetch } from "../actions";
import { connect } from "react-redux";
import {ButtonGroup} from 'react-native-elements';
import _ from "lodash";
import firebase from "@firebase/app";
import "@firebase/auth";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 2
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  componentWillMount() {
    if (typeof this.props.owner === "undefined") {
      const { currentUser } = firebase.auth();
      this.props.profileFetch(currentUser.uid);
    } else {
      console.log("another Profile");
    }
  }

  render() {
    const buttons = ["Mis ofertas", "Me gusta", "Guardadas"];
    const { selectedIndex } = this.state;
    return (
      <View>
        <View
          style={{
            height: 250,
            borderWidth: 1,
            borderColor: "black",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
        <View style={{flex: 1, marginTop: 20}}>
          <Avatar
            large
            rounded
            source={{
              uri: this.props.uriPhoto
            }}
          />
          <Text>{this.props.nameOfUser}</Text>

          </View>
          <View style={{ justifyContent:"flex-end", flex:1}}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40, width: "100%", bottom:0 }}
            />
        </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { nameOfUser, uriPhoto } = state.profileR;

  return { nameOfUser, uriPhoto };
};

export default connect(
  mapStateToProps,
  { profileFetch }
)(Profile);

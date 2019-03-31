import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { profileFetch, productFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import firebase from "@firebase/app";
import "@firebase/auth";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      data: [],
      check: false,
      nameV: "",
      nameState: "",
      uriState: ""
    };
    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    const uidV = firebase.auth().currentUser.uid;
    if (selectedIndex == 0) {
      const newData = this.arrayholder.filter(item => {
        return item.owner.indexOf(uidV) > -1;
      });
      this.setState({
        data: newData
      });
    } else {
      this.setState({
        data: this.arrayholder
      });
    }
  }

  componentDidMount() {
    if (typeof this.props.owner === "undefined") {
      const { currentUser } = firebase.auth();
      this.props.profileFetch(currentUser.uid);
    } else {
      this.props.profileFetch(this.props.owner);
    }
    this.makeRemoteRequest();
  }

  // shouldComponentUpdate(nextProps) {
  //   const differentName = this.state.nameV !== nextProps.nameOfUser;
  //   return differentName;
  // }

  componentWillReceiveProps(nextProps) {
    if (typeof (nextProps.nameOfUser) != "undefined" && this.props != nextProps) {
      this.setState({
        nameState: nextProps.nameOfUser,
        uriState: nextProps.uriPhoto
      });
    }
    this.setState({
      data: nextProps.product
    });
    if (this.state.check) {
      this.updateIndex(0);
    }
    this.setState({ check: true });
  }

  makeRemoteRequest = () => {
    this.props.productFetch();
    this.arrayholder = _.values(this.props.product);
  };

  render() {
    const buttons = ["Mis ofertas", "Me gusta", "Guardadas"];
    const { selectedIndex } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            height: 250,
            width: "100%"
          }}
        >
          <View style={{ flex: 1, marginTop: 10 }}>
            <View style={{ marginRight: 10, alignSelf: "flex-end" }}>
              <Icon
                raised
                name="pencil"
                type="font-awesome"
                color="#30A66D"
                onPress={() =>
                  Actions.EdProfile({
                    nameOfUsr: this.state.nameState,
                    uriProfile: this.props.uriPhoto,
                    uidUser: firebase.auth().currentUser.uid
                  })
                }
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginTop: 0
              }}
            >
              <Avatar
                large
                rounded
                source={{
                  uri: this.state.uriState
                }}
              />
              <Text>{this.state.nameState}</Text>
              {/* <Text>Seguidores</Text>
              <Text>100</Text>
              <Text>Siguiendo</Text>
              <Text>10</Text> */}
            </View>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40, width: "100%", bottom: 0 }}
            />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListProductItem product={item} />}
          keyExtractor={item => item.uid}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { nameOfUser, uriPhoto } = state.profile;

  const profile = _.map(state.profile, (val, uid) => {
    return { val, uid };
  });

  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });
  return { product, profile, nameOfUser, uriPhoto };
};

export default connect(
  mapStateToProps,
  { profileFetch, productFetch }
)(Profile);

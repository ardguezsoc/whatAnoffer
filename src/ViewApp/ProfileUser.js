import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Button } from "react-native-elements";
import {
  productFetch,
  profileFetch,
  followUser,
  followFetch,
  unFollowUser
} from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import _ from "lodash";
import { MyModal } from "../component";
import LinearGradient from "react-native-linear-gradient";
import firebase from "@firebase/app";
import "@firebase/auth";

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      data: [],
      firebaseAuth: firebase.auth().currentUser.uid,
      statusFollow: false,
      modalStatus: false
    };
    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    if (selectedIndex == 0) {
      const newData = this.arrayholder.filter(item => {
        return item.owner.indexOf(this.props.ownerValue) > -1;
      });
      this.setState({
        data: newData
      });
    } else {
      this.setState({ data: this.arrayholder });
    }
  }

  follow(check) {
    check
      ? this.props.followUser(this.state.firebaseAuth, this.props.ownerValue)
      : this.setState({ modalStatus: true });
  }

  onDecline() {
    this.setState({ modalStatus: false });
  }

  onAccept() {
    this.props.unFollowUser(this.state.firebaseAuth, this.props.ownerValue);
    this.setState({ modalStatus: false });
  }

  componentWillMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product,
      statusFollow: _.includes(nextProps.siguiendo, this.props.ownerValue, 0)
    });

    this.updateIndex(0);
  }

  makeRemoteRequest = () => {
    this.props.productFetch();
    this.props.profileFetch(this.props.ownerValue);
    this.props.followFetch(this.state.firebaseAuth);
    this.arrayholder = _.values(this.props.product);
  };

  ListEmptyView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundStyle}>
          ¡ Vaya parece que no hay ofertas =( !
        </Text>
      </View>
    );
  };

  render() {
    const buttons = ["Mis ofertas", "Me gusta", "Guardadas"];
    const { selectedIndex } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            height: 220,
            width: "100%"
          }}
        >
          <LinearGradient colors={["#30A66D", "#a3dbbc"]} style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: 10 }}>
              <View style={{ marginRight: 4, alignSelf: "flex-end" }}>
                {!this.state.statusFollow ? (
                  <Button
                    title="Seguir"
                    buttonStyle={{
                      borderRadius: 15,
                      width: 90,
                      backgroundColor: "#109C59",
                      borderWidth: 1,
                      borderColor: "white"
                    }}
                    onPress={() => this.follow(true)}
                  />
                ) : (
                  <Button
                    title="Siguiendo"
                    buttonStyle={{
                      borderRadius: 15,
                      width: 100,
                      backgroundColor: "green",
                      borderWidth: 1,
                      borderColor: "white"
                    }}
                    onPress={() => this.follow(false)}
                  />
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 0,
                  paddingBottom: 40
                }}
              >
                <Avatar
                  large
                  rounded
                  source={{
                    uri: this.props.uriPhoto
                  }}
                />
                <Text style={{ fontSize: 18, color: "white" }}>
                  {this.props.nameOfUser}
                </Text>
                {/* <Text>Seguidores</Text>
              <Text>100</Text>
              <Text>Siguiendo</Text>
            <Text>10</Text> */}
              </View>
            </View>
          </LinearGradient>
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
          </View>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListProductItem product={item} />}
          keyExtractor={item => item.uid}
          ListEmptyComponent={this.ListEmptyView}
        />
        <MyModal
          title="¿Seguro?"
          modalStatus={this.state.modalStatus}
          subTitle="¿Quieres dejar de seguir a este usuario?"
          Decline={() => this.onDecline()}
          Accept={() => this.onAccept()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });
  const { nameOfUser, uriPhoto } = state.profile;
  const { siguiendo } = state.people;

  return { product, nameOfUser, uriPhoto, siguiendo };
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  notFoundStyle: {
    color: "grey",
    fontSize: 18,
    textAlign: "center",
    marginTop: 30
  }
};

export default connect(
  mapStateToProps,
  { productFetch, profileFetch, followUser, unFollowUser, followFetch }
)(ProfileUser);

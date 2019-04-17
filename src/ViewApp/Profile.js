import React, { Component } from "react";
import _ from "lodash";
import { View, FlatList, Text } from "react-native";
import { Avatar, Icon, ButtonGroup } from "react-native-elements";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Actions } from "react-native-router-flux";
import { productFetch, profileFetch, followFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      selectedIndex: 0,
      uidUser: firebase.auth().currentUser.uid,
      stateFollowers: 0,
      stateFollowing: 0,
      arr: []
    };

    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.props.profileFetch(this.state.uidUser);
    this.props.productFetch();
    this.props.followFetch(this.state.uidUser);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        data: nextProps.product,
        arr: nextProps.product,
        stateFollowers: _.size(nextProps.seguidores),
        stateFollowing: _.size(nextProps.siguiendo)
      },
      () => {
        this.updateIndex(this.state.selectedIndex);
      }
    );
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    var newData;
    if (selectedIndex == 0) {
      newData = this.state.arr.filter(item => {
        return (
          item.owner.indexOf(this.state.uidUser) > -1 &&
          item.status.indexOf("hidden") == -1
        );
      });
      this.setState({
        data: newData
      });
    } else if (selectedIndex == 1) {
      newData = this.state.arr.filter(item => {
        return (
          _.includes(item.likes, this.state.uidUser, 0) == true &&
          item.status.indexOf("hidden") == -1
        );
      });
      this.setState({
        data: newData
      });
    } else {
      newData = this.state.arr.filter(item => {
        return (
          _.includes(item.saved, this.state.uidUser, 0) == true &&
          item.status.indexOf("noStock") == -1 &&
          item.status.indexOf("hidden") == -1
        );
      });
      this.setState({
        data: newData
      });
    }
  }

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
              <View style={{ marginRight: 10, alignSelf: "flex-end" }}>
                <Icon
                  raised
                  name="pencil"
                  type="font-awesome"
                  color="#30A66D"
                  onPress={() =>
                    Actions.EdProfile({
                      nameOfUsr: this.props.nameOfUser,
                      uriProfile: this.props.uriPhoto,
                      uidUser: this.state.uidUser
                    })
                  }
                />
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
                <View style={{ flexDirection: "row", height: 70 }}>
                  <View style={{ flex: 1, alignItems: "center", marginTop: 0 }}>
                    <Text style={styles.textStyle}> Seguidores</Text>
                    <Text style={styles.textStyle}>
                      {this.state.stateFollowers}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.textStyle}>Siguiendo</Text>
                    <Text style={styles.textStyle}>
                      {this.state.stateFollowing}
                    </Text>
                  </View>
                </View>
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
          renderItem={({ item }) => (
            <ListProductItem product={item} uidUser={this.state.uidUser} />
          )}
          keyExtractor={item => item.uid}
          ListEmptyComponent={this.ListEmptyView}
        />
      </View>
    );
  }
}

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
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
};

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });

  const { nameOfUser, uriPhoto } = state.profile;
  if (state.followRed !== null) {
    const { seguidores, siguiendo } = state.followRed;
    return { product, nameOfUser, uriPhoto, siguiendo, seguidores };
  } else {
    return { product, nameOfUser, uriPhoto };
  }
};

export default connect(
  mapStateToProps,
  { productFetch, profileFetch, followFetch }
)(Profile);

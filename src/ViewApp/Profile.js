import React, { Component } from "react";
import _ from "lodash";
import { View, FlatList, Text } from "react-native";
import { Avatar, Icon, ButtonGroup } from "react-native-elements";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Actions } from "react-native-router-flux";
import { productFetch, profileFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      selectedIndex: -1,
      uidUser : firebase.auth().currentUser.uid
    };

    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    });
    this.updateIndex(0);

  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    if (selectedIndex == 0) {
      const newData = this.arrayholder.filter(item => {
        return item.owner.indexOf(this.state.uidUser) > -1;
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

  makeRemoteRequest = () => {
    this.props.profileFetch(this.state.uidUser);
    this.props.productFetch();
    var arr = _.values(this.props.product);
    this.setState({
      data: arr
    });
    this.arrayholder = arr;

  };

  ListEmptyView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundStyle}>
          ¡ Vaya parece que no hay ofertas de este tipo =( !
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
  }
};

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });

  const { nameOfUser, uriPhoto } = state.profile;

  return { product, nameOfUser, uriPhoto };
};

export default connect(
  mapStateToProps,
  { productFetch, profileFetch }
)(Profile);

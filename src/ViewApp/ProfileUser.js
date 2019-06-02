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
      selectedIndex: 0,
      data: [],
      firebaseAuth: firebase.auth().currentUser.uid,
      statusFollow: false,
      modalStatus: false,
      stateFollowers: 0,
      stateFollowing: 0,
      arr: [],
      control: false
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    if (selectedIndex == 0) {
      const newData = this.state.arr.filter(item => {
        return (
          item.owner.indexOf(this.props.ownerValue) > -1 &&
          item.status.indexOf("hidden") == -1
        );
      });
      this.setState({
        data: newData
      });
    } else if (selectedIndex == 1) {
      newData = this.state.arr.filter(item => {
        return (
          _.includes(item.likes, this.props.ownerValue, 0) == true &&
          item.status.indexOf("hidden") == -1
        );
      });
      this.setState({
        data: newData
      });
    } else {
      newData = this.state.arr.filter(item => {
        return (
          _.includes(item.saved, this.props.ownerValue, 0) == true &&
          item.status.indexOf("read") != -1
        );
      });
      this.setState({
        data: newData
      });
    }
  }

  follow(check) {
    check
      ? this.setState(
          { statusFollow: true, stateFollowers: this.state.stateFollowers + 1 },
          () => {
            this.props.followUser(
              this.state.firebaseAuth,
              this.props.ownerValue
            );
          }
        )
      : this.setState({ modalStatus: true });
  }

  onDecline() {
    this.setState({ modalStatus: false });
  }

  onAccept() {
    this.setState(
      { modalStatus: false, stateFollowers: this.state.stateFollowers - 1 },
      () => {
        this.props.unFollowUser(this.state.firebaseAuth, this.props.ownerValue);
      }
    );
  }

  componentDidMount() {
    this.props.productFetch();
    this.props.profileFetch(this.props.ownerValue);
    this.props.followFetch(this.props.ownerValue);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.control ) {
      this.setState({
        stateFollowers: _.size(nextProps.seguidores),
        stateFollowing: _.size(nextProps.siguiendo)
      });
    }
    this.setState(
      {
        control: true,
        data: nextProps.product,
        arr: nextProps.product,
        statusFollow: _.includes(
          nextProps.seguidores,
          this.state.firebaseAuth,
          0
        )
      },
      () => {
        this.updateIndex(this.state.selectedIndex);
      }
    );
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
              <View style={{ marginRight: 4, alignSelf: "flex-end" }}>
                {!this.state.statusFollow ? (
                  <Button
                    title="Seguir"
                    buttonStyle={{
                      borderRadius: 15,
                      width: 90,
                      height: 40,
                      backgroundColor: "#109C59"
                    }}
                    onPress={() => this.follow(true)}
                  />
                ) : (
                  <Button
                    title="Siguiendo"
                    buttonStyle={{
                      borderRadius: 15,
                      width: 100,
                      height: 40,
                      backgroundColor: "#109C59"
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
                  size="large"
                  rounded
                  source={{
                    uri: this.props.uriPhoto
                  }}
                />
                <Text style={{ fontSize: 18, color: "white" }}>
                  {this.props.nameOfUser}
                </Text>
                <View style={{ flexDirection: "row", height: 40 }}>
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
              selectedButtonStyle={{ backgroundColor: "#30A66D" }}
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
          Accept={() =>
            this.setState({ modalStatus: false }, () => {
              this.onAccept();
            })
          }
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
  if (state.followRed !== null) {
    const { seguidores, siguiendo } = state.followRed;
    return { product, nameOfUser, uriPhoto, siguiendo, seguidores };
  } else {
    return { product, nameOfUser, uriPhoto };
  }
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
  },
  textStyle: {
    fontSize: 15,
    color: "white"
  }
};

export default connect(
  mapStateToProps,
  { productFetch, profileFetch, followUser, unFollowUser, followFetch }
)(ProfileUser);

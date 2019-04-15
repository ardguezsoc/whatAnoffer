import React, { Component } from "react";
import _ from "lodash";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { productFetch, peopleFetch } from "../actions";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { NavigationEvents } from "react-navigation";
import firebase from "@firebase/app";
import "@firebase/auth";

class SearchPeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      value: ""
    };
    this.arrayP = [];
  }

  componentWillMount() {
    this.props.peopleFetch();
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.people,
      loading: false
    });
    this.arrayP = nextProps.people;
  }

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.arrayP.filter(item => {
      const itemData = item.nameOfUser.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
  };

  ListEmptyView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundStyle}>
          ¡ Vaya no hay usuarios con este nombre =( !
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <SearchBar
          placeholder="Buscar usuario"
          inputStyle={{
            backgroundColor: "white",
            color: "black"
          }}
          clearIcon
          containerStyle={{
            backgroundColor: "#109C59",
            flex: 1
          }}
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {/* <NavigationEvents
          onWillFocus={() => {
            this.props.peopleFetch();
          }}
        /> */}
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={item.nameOfUser}
                avatar={{ uri: item.uriPhoto }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => {
                  item.uid == firebase.auth().currentUser.uid
                    ? Actions.ProfileView()
                    : Actions.ProfileUser({
                        ownerValue: item.uid
                      });
                }}
              />
            )}
            keyExtractor={item => item.uid}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.ListEmptyView}
            stickyHeaderIndices={[0]}
          />
        </View>
      );
    }
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
  const people = _.map(state.people, (val, uid) => {
    return { ...val, uid };
  });

  return { people };
};

export default connect(
  mapStateToProps,
  { productFetch, peopleFetch }
)(SearchPeople);

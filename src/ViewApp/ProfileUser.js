import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { productFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import { ButtonGroup } from "react-native-elements";
import _ from "lodash";
import LinearGradient from "react-native-linear-gradient";

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      data: []
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

  componentWillMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    });

    this.updateIndex(0);
  }

  makeRemoteRequest = () => {
    this.props.productFetch();
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
              <View style={{ marginRight: 10, alignSelf: "flex-end" }}>
                <Icon
                  raised
                  name="pencil"
                  type="font-awesome"
                  color="#30A66D"
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
                    uri: this.props.uri
                  }}
                />
                <Text style={{ fontSize: 18, color: "white" }}>
                  {this.props.nameV}
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

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });
  return { product };
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
  { productFetch }
)(ProfileUser);

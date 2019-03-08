import React, { Component } from "react";
import _ from "lodash";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { SearchBar, ButtonGroup } from "react-native-elements";
import Modal from "react-native-modal";
import { productFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import { Icon } from "react-native-elements";

const component1 = () => (
  <FontAwesome style={{ fontSize: 22}}>{Icons.fish}</FontAwesome>
);
const component2 = () => (
  <FontAwesome style={{ fontSize: 22 }} type={IconTypes.FAB}>
    {Icons.apple}
  </FontAwesome>
);
const component3 = () => <FontAwesome>{Icons.cookie}</FontAwesome>;
const component4 = () => (
  <FontAwesome style={{ fontSize: 24 }} type={IconTypes.FAB}>
    {Icons.gulp}
  </FontAwesome>
);
const component5 = () => (
  <FontAwesome style={{ fontSize: 22 }} type={IconTypes.FA}>
    {Icons.beer}
  </FontAwesome>
);

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      isModalVisible: false,
      selectedIndex: -1
    };

    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    });
    this.setState({ loading: false });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  makeRemoteRequest = () => {
    this.props.productFetch();
    var arr = _.values(this.props.product);
    this.setState({
      data: arr,
      loading: false
    });
    this.arrayholder = arr;
    this.setState({ loading: false });
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.productValue.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
  };

  renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <SearchBar
          placeholder="Buscar oferta"
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
        <View
          style={{
            backgroundColor: "#109C59",
            borderTopWidth: 1,
            borderBottomWidth: 1
          }}
        >
          <Icon
            reverse
            size={19}
            name="list-ul"
            type="font-awesome"
            color="#109C59"
            onPress={this._toggleModal}
          />
        </View>
      </View>
    );
  };

  render() {
    const buttons = [
      { element: component1 },
      { element: component2 },
      { element: component3 },
      { element: component4 },
      { element: component5 }
    ];
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
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <ListProductItem product={item} />}
            keyExtractor={item => item.uid}
            ListHeaderComponent={this.renderHeader}
          />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Modal
              isVisible={this.state.isModalVisible}
              style={{ justifyContent: "flex-end", margin: 0 }}
              onBackButtonPress={this._toggleModal}
              onBackdropPress={() => this.setState({ isModalVisible: false })}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "60%"
                }}
              >
                <View
                  style={{
                    alignItems: "flex-end",
                    marginTop: 10,
                    marginRight: 10
                  }}
                >
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 20,
                        fontFamily: "Sniglet"
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Pacifico",
                      fontSize: 20,
                      color: "#30A66D"
                    }}
                  >
                    Filtros
                  </Text>
                  <Text style={{marginTop: 10}}>Solo mostrar este producto:</Text>
                  <ButtonGroup
                    selectedButtonStyle={{backgroundColor:"#30A66D"}}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={{
                      height: 70,
                      width: 350,
                      borderRadius: 15
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });

  return { product };
};

export default connect(
  mapStateToProps,
  { productFetch }
)(SearchView);

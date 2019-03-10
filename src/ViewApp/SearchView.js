import React, { Component } from "react";
import _ from "lodash";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { SearchBar, ButtonGroup, Button, Slider } from "react-native-elements";
import Modal from "react-native-modal";
import { productFetch,  todayEpoch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import { Icon } from "react-native-elements";

const component1 = () => (
  <FontAwesome style={{ fontSize: 26 }}>{Icons.fish}</FontAwesome>
);

const component2 = () => (
  <FontAwesome style={{ fontSize: 28 }} type={IconTypes.FAB}>
    {Icons.apple}
  </FontAwesome>
);

const component3 = () => (
  <FontAwesome style={{ fontSize: 24 }}>{Icons.cookie}</FontAwesome>
);

const component4 = () => (
  <FontAwesome style={{ fontSize: 32 }} type={IconTypes.FAB}>
    {Icons.gulp}
  </FontAwesome>
);

const component5 = () => (
  <FontAwesome style={{ fontSize: 28 }} type={IconTypes.FA}>
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
      selectedIndex: -1,
      value: "",
      trueSelectedValue: -1,
      number: 0,
      trueHourValue: 0
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

  resetCancel() {
    this.setState({
      isModalVisible: false,
      selectedIndex: this.state.trueSelectedValue,
      number: this.state.trueHourValue
    });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  whatProduct(value) {
    switch (value) {
      case 0:
        return "Carne y Pescado";
      case 1:
        return "Frutas & Vegetales";
      case 2:
        return "Dulces";
      case 3:
        return "Lácteos";
      case 4:
        return "Bebidas";
      default:
        return "";
    }
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
    const filterProduct = this.whatProduct(this.state.trueSelectedValue);
    var timeFilter;
    if(this.state.trueHourValue == 0){
      timeFilter = 0
    }else{
      timeFilter = todayEpoch() - this.state.trueHourValue * 3600000; 
    }
    const newData = this.arrayholder.filter(item => {
      const itemKind = item.productKindValue;
      const itemTime = item.currentTime;
      const itemData = item.productValue.toUpperCase();
      const textData = text.toUpperCase();
      return (
        itemData.indexOf(textData) > -1 && itemKind.indexOf(filterProduct) > -1 && parseInt(itemTime) > timeFilter
      );
    });
    this.setState({
      data: newData
    });
  };

  ListEmptyView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundStyle}>¡ Vaya parece que no hay ofertas de este tipo =( !</Text>
      </View>

    );
  }

  readyFilter = () => {
    this.setState(
      {
        isModalVisible: false,
        trueSelectedValue: this.state.selectedIndex,
        trueHourValue: this.state.number
      },
      () => {
        this.searchFilterFunction(this.state.value);

      }
    );
  };

  rmFilter() {
    this.setState(
      {
        isModalVisible: false,
        trueSelectedValue: -1,
        selectedIndex: -1,
        trueHourValue: 0,
        number: 0
      },
      () => {
        this.searchFilterFunction(this.state.value);
      }
    );
  }

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
            ListEmptyComponent={this.ListEmptyView}
          />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Modal
              isVisible={this.state.isModalVisible}
              style={{ justifyContent: "flex-end", margin: 0 }}
              onBackButtonPress={() => this.resetCancel()}
              onBackdropPress={() => this.resetCancel()}
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
                  <TouchableOpacity onPress={() => this.resetCancel()}>
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
                      fontSize: 30,
                      color: "#30A66D"
                    }}
                  >
                    Filtros
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginBottom: 5, fontSize: 17 }}
                  >
                    Solo mostrar este tipo producto:
                  </Text>
                  <ButtonGroup
                    selectedButtonStyle={{ backgroundColor: "#30A66D" }}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={{
                      height: 70,
                      width: 350,
                      borderRadius: 15
                    }}
                  />
                  <View
                    style={{
                      alignItems: "stretch",
                      justifyContent: "center"
                    }}
                  >
                    {this.state.number > 0 ? (
                      <Text
                        style={{ marginTop: 14, marginBottom: 5, fontSize: 17 }}
                      >
                        Mostrar ofertas creadas hace {this.state.number}
                        {this.state.number == 1 ? (
                          <Text> hora o menos </Text>
                        ) : (
                          <Text> horas o menos </Text>
                        )}
                      </Text>
                    ) : (
                      <Text
                        style={{ marginTop: 14, marginBottom: 5, fontSize: 17 }}
                      >
                        {" "}
                        Mostrar ofertas creadas a culaquier hora
                      </Text>
                    )}

                    <Slider
                      maximumValue={23}
                      step={1}
                      thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
                      style={{ width: 350, marginTop: 5 }}
                      thumbTintColor="#52BA88"
                      value={this.state.number}
                      maximumTrackTintColor="#d3d3d3"
                      minimumTrackTintColor="#077B43"
                      onValueChange={number => this.setState({ number })}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Button
                      title="Listo"
                      onPress={() => this.readyFilter()}
                      buttonStyle={{
                        borderRadius: 15,
                        backgroundColor: "#109C59",
                        width: 100
                      }}
                    />
                    <Button
                      title="Borrar filtros"
                      onPress={() => this.rmFilter()}
                      buttonStyle={{
                        borderRadius: 15,
                        backgroundColor: "#ff3333"
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
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

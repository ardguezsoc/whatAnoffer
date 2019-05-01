import React, { Component } from "react";
import _ from "lodash";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Switch
} from "react-native";
import { SearchBar, ButtonGroup, Button, Slider } from "react-native-elements";
import Modal from "react-native-modal";
import { productFetch, todayEpoch, followFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "@firebase/app";
import "@firebase/auth";
import { NavigationEvents } from "react-navigation";

const component1 = () => (
  <FontAwesome style={{ fontSize: 28 }} type={IconTypes.FAS}>
    {Icons.fish}
  </FontAwesome>
);

const component2 = () => <Icon size={30} name="food-apple" />;

const component3 = () => <Icon size={30} name="cupcake" />;

const component4 = () => (
  <FontAwesome style={{ fontSize: 32 }} type={IconTypes.FAB}>
    {Icons.gulp}
  </FontAwesome>
);

const component5 = () => (
  <FontAwesome style={{ fontSize: 24 }} type={IconTypes.FAS}>
    {Icons.glassMartiniAlt}
  </FontAwesome>
);

const component7 = () => <Text>Alfabéticamente</Text>;
const component6 = () => <Text>Más Recientes</Text>;

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      isModalVisible: false,
      selectedIndex: -1,
      selectedOrder: 0,
      value: "",
      trueSelectedValue: -1,
      trueOrder: 0,
      number: 0,
      trueHourValue: 0,
      stateUid: firebase.auth().currentUser.uid,
      arr: [],
      check: false,
      valueSwitch: false,
      followData: []
    };

    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.productFetch();
    this.props.followFetch(this.state.stateUid);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        data: nextProps.product,
        followData: nextProps.siguiendo,
        arr: nextProps.product
      },
      () => {
        this.readyFilter();
      }
    );
    this.setState({ loading: false });
  }

  resetCancel() {
    this.setState({
      isModalVisible: false,
      selectedIndex: this.state.trueSelectedValue,
      selectedOrder: this.state.trueOrder,
      number: this.state.trueHourValue
    });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  updateOrder(selectedOrder) {
    this.setState({ selectedOrder });
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

  searchFilterFunction = text => {
    this.setState({
      value: text,
      check: true
    });
    const filterProduct = this.whatProduct(this.state.trueSelectedValue);
    var timeFilter;
    if (this.state.trueHourValue == 0) {
      timeFilter = 0;
    } else {
      timeFilter = todayEpoch() - this.state.trueHourValue * 3600000;
    }
    const newData = this.state.arr.filter(item => {
      const itemKind = item.productKindValue;
      const itemTime = item.currentTime;
      const itemData = item.productValue.toUpperCase();
      const textData = text.toUpperCase();
      if (this.state.valueSwitch) {
        return (
          itemData.indexOf(textData) > -1 &&
          itemKind.indexOf(filterProduct) > -1 &&
          parseInt(itemTime) > timeFilter &&
          _.includes(this.state.followData, item.owner, 0) == true &&
          item.status.indexOf("expired") == -1
        );
      } else {
        return (
          itemData.indexOf(textData) > -1 &&
          itemKind.indexOf(filterProduct) > -1 &&
          parseInt(itemTime) > timeFilter &&
          item.status.indexOf("expired") == -1
        );
      }
    });
    {
      this.state.selectedOrder == 0
        ? this.setState({
            data: _.orderBy(newData, ["currentTime"], ["desc"])
          })
        : this.setState({
            data: _.orderBy(newData, ["productValue"], ["asc"])
          });
    }
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

  readyFilter = () => {
    this.setState(
      {
        isModalVisible: false,
        trueSelectedValue: this.state.selectedIndex,
        trueOrder: this.state.selectedOrder,
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
        number: 0,
        valueSwitch: false,
        selectedOrder: 0
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
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              height: "100%",
              paddingRight: 7
            }}
          >
            <Icon
              name="filter-variant"
              color="white"
              size={27}
              onPress={() => {
                this.setState({ isModalVisible: !this.state.isModalVisible });
              }}
            />
          </View>
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
    const buttonsOrder = ["Más recientes", "Alfabéticamente"];
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
          <NavigationEvents
            onWillFocus={() => {
              this.props.followFetch(this.state.stateUid);
            }}
          />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListProductItem product={item} uidUser={this.state.stateUid} />
            )}
            keyExtractor={item => item.uid}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.ListEmptyView}
            stickyHeaderIndices={[0]}
          />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Modal
              isVisible={this.state.isModalVisible}
              style={{ justifyContent: "flex-end", margin: 0 }}
              onBackdropPress={() => this.resetCancel()}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 475
                }}
              >
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Pacifico",
                        fontSize: 30,
                        color: "#30A66D",
                        textAlign: "center"
                      }}
                    >
                      Filtros
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginTop: 10,
                      marginRight: 10,
                      width: 25
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
                </View>
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                  <Text style={{ marginTop: 9, marginBottom: 5, fontSize: 17 }}>
                    Solo mostrar este tipo producto:
                  </Text>
                  <ButtonGroup
                    selectedButtonStyle={{ backgroundColor: "#30A66D" }}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={{
                      alignItems: "center",
                      justifyContent: "center",
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
                        style={{ marginTop: 13, marginBottom: 3, fontSize: 16 }}
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
                        style={{ marginTop: 14, marginBottom: 8, fontSize: 16 }}
                      >
                        Mostrar ofertas creadas a culaquier hora
                      </Text>
                    )}

                    <Slider
                      maximumValue={24}
                      step={3}
                      thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
                      style={{ width: 250, marginTop: 5, alignSelf: "center" }}
                      thumbTintColor="#52BA88"
                      value={this.state.number}
                      maximumTrackTintColor="#d3d3d3"
                      minimumTrackTintColor="#077B43"
                      onValueChange={number => this.setState({ number })}
                    />
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Text
                        style={{ marginTop: 10, marginBottom: 8, fontSize: 15 }}
                      >
                        Mostrar solo ofertas de usuarios que sigo:
                      </Text>
                      <Switch
                        value={this.state.valueSwitch}
                        thumbColor="#52BA88"
                        trackColor="#d3d3d3"
                        onValueChange={() => {
                          this.setState({
                            valueSwitch: !this.state.valueSwitch
                          });
                        }}
                        style={{ marginTop: 4 }}
                      />
                    </View>
                    <Text
                      style={{ marginTop: 10, marginBottom: 5, fontSize: 15 }}
                    >
                      Ordenar ofertas:
                    </Text>
                    <View style={{ alignSelf: "center" }}>
                      <ButtonGroup
                        selectedButtonStyle={{
                          backgroundColor: "#30A66D"
                        }}
                        selectedTextStyle={{ color: "white" }}
                        onPress={this.updateOrder}
                        selectedIndex={this.state.selectedOrder}
                        buttons={buttonsOrder}
                        containerStyle={styles.containerOrder}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 25
                    }}
                  >
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
  },
  containerOrder: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 275,
    borderRadius: 15,
  }
};

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });
  if (state.followRed != null) {
    const { siguiendo } = state.followRed;
    return { product, siguiendo };
  } else {
    return { product };
  }
};

export default connect(
  mapStateToProps,
  { productFetch, followFetch }
)(SearchView);

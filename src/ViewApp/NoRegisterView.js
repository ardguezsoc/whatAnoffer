import _ from "lodash";
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";
import { productFetch } from "../actions";
import { connect } from "react-redux";
import { CardItem } from "../component";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";

class NoRegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      modalStatus: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.props.productFetch();
    this.setState({
      data: this.props.product
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListBasicItem product={item} />}
          keyExtractor={item => item.uid}
          ListHeaderComponent={this.renderHeader}
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

export default connect(
  mapStateToProps,
  { productFetch }
)(NoRegisterView);

class ListBasicItem extends Component {
  state = {
    modalStatus: false
  };
  onItemPress() {
    this.setState({ modalStatus: true });
  }

  render() {
    const {
      productValue,
      priceNew,
      priceOld,
      date,
      urlOfImag
    } = this.props.product;
    return (
      <View>
        <TouchableNativeFeedback onPress={this.onItemPress.bind(this)}>
          <View>
            <CardItem
              title={productValue}
              priceNew={priceNew}
              priceOld={priceOld}
              dateProd={date}
              urlImag={urlOfImag}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.modalStatus}
            onBackButtonPress={() => this.setState({ modalStatus: false })}
            onBackdropPress={() => this.setState({ modalStatus: false })}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "50%",
                borderRadius: 15
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop: 10,
                  marginRight: 10
                }}
              />
              <View style={{ alignSelf: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pacifico",
                    fontSize: 30,
                    color: "#109C59"
                  }}
                >
                  ¡Vaya!
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10,
                    textAlign: "center"
                  }}
                >
                  Parece que no estas identificado, unete a la lucha contra el
                  desperdicio de comida y disfruta de todas las funcionalidades
                  disponibles.
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Button
                    title="Registrarse"
                    onPress={() => Actions.newUser()}
                    buttonStyle={{
                      borderRadius: 15,
                      width: 150,
                      backgroundColor: "#109C59"

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

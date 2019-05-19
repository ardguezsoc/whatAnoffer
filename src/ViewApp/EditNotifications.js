import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ButtonGroup } from "react-native-elements";
import FontAwesome, { Icons, IconTypes } from "react-native-fontawesome";
import { whatProduct, whatIndex, updateNotif } from "../actions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "lodash";
import { ButtonOwn } from "../component";
import { connect } from "react-redux";

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
class EditNotifications extends Component {
  constructor(props) {
    super(props);

    this.kindProduct = this.props.topicsArray;
    this.arrayholder = [];
    this.updateIndex = this.updateIndex.bind(this);

    for (var i = 0; i < this.props.topicsArray.length; i++) {
      this.arrayholder.push(whatIndex(this.props.topicsArray[i]));
    }
    this.state = {
      loading: false,
      data: [],
      value: "",
      indexSelected: this.arrayholder
    };
  }

  updateIndex(value) {
    if (this.arrayholder.includes(value)) {
      _.remove(this.arrayholder, function(n) {
        return n == value;
      });
      _.remove(this.kindProduct, function(n) {
        return n == whatProduct(value);
      });
      this.setState({ indexSelected: this.arrayholder });
    } else {
      this.arrayholder.push(value);
      this.kindProduct.push(whatProduct(value));
      this.setState({ indexSelected: this.arrayholder });
    }
  }

  updateTopics() {
    this.setState({ loading: true });
    this.props.updateNotif(this.kindProduct);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{ marginTop: 9, marginBottom: 5, fontSize: 17, marginLeft: 8 }}
        >
          Elige que tipos de producto te interesan:
        </Text>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <ButtonGroup
            selectedIndexes={this.arrayholder}
            selectedButtonStyle={{ backgroundColor: "#30A66D" }}
            onPress={this.updateIndex}
            buttons={[
              { element: component1 },
              { element: component2 },
              { element: component3 },
              { element: component4 },
              { element: component5 }
            ]}
            containerStyle={{
              alignItems: "center",
              justifyContent: "center",
              height: 70,
              width: 350,
              borderRadius: 15
            }}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            height: 40,
            width: "75%",
            alignSelf: "center"
          }}
        >
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#30A66D" />
          ) : (
            <ButtonOwn
              style={{ borderColor: "#109C59" }}
              onPress={() => {
                this.updateTopics();
              }}
            >
              <Text style={{ color: "#109C59" }}> Guardar cambios </Text>
            </ButtonOwn>
          )}
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { whatProduct, whatIndex, updateNotif }
)(EditNotifications);

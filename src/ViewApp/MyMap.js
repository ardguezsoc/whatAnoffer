import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import { MapModal, MyModal } from "../component";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { productFetch } from "../actions";
import _ from "lodash";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import firebase from "@firebase/app";
import "@firebase/auth";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidXNlcm5hbWV0ZXN0IiwiYSI6ImNqdjBpMmoxMTBmazk0OXFjOTludnN5dTgifQ.bEECII2tva-nIsHjo-lvLw"
);

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latUser: 28.073222,
      longUser: -15.451476,
      alertStatus: false,
      data: [],
      modalStatus: false,
      placeState: "",
      dataFiltered: "",
      uidUser: firebase.auth().currentUser.uid
    };
  }
  componentDidMount() {
    this.props.productFetch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    });
  }

  checkPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = parseFloat(position.coords.latitude);
        const long = parseFloat(position.coords.longitude);
        this.setState({ latUser: lat, longUser: long });
      },
      error => {
        this.setState({ alertStatus: true });
      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }

  Myposition() {
    return (
      <Mapbox.PointAnnotation
        key="uniqueId"
        id="pointAnnotation"
        coordinate={[this.state.longUser, this.state.latUser]}
      >
        <View style={styles.annotationContainer}>
          <View
            style={[styles.annotationFill, { backgroundColor: "#109c59" }]}
          />
        </View>
        <Mapbox.Callout title="You are here!" />
      </Mapbox.PointAnnotation>
    );
  }

  placeShow(nameValue) {
    const newData = this.state.data.filter(item => {
      return (
        item.placeValue.indexOf(nameValue) != -1 &&
        item.status.indexOf("read") != -1
      );
    });
    this.setState({
      modalStatus: !this.state.modalStatus,
      dataFiltered: newData,
      placeState: nameValue
    });
  }

  offerPosition() {
    const markers = [];
    for (var i = 0; i < this.props.product.length - 1; i++) {
      if (this.props.product[i].status == "read") {
        const varValue = this.props.product[i].placeValue;
        var arrSplit = this.props.product[i].address.split(",");
        markers.push(
          <MapboxGL.PointAnnotation
            id={this.props.product[i].uid}
            coordinate={[parseFloat(arrSplit[1]), parseFloat(arrSplit[0])]}
            title={this.props.product[i].placeValue}
          >
            <ImageBackground
              source={{
                uri:
                  "https://res.cloudinary.com/dfir4b1pq/image/upload/v1556524887/shop.png"
              }}
              style={styles.annotationShop}
            />
            <MapboxGL.Callout>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 20,
                  width: "auto"
                }}
                onPress={() => {
                  this.placeShow(varValue);
                }}
              >
                <Text style={{ height: 20, width: "100%" }}>
                  {this.props.product[i].placeValue}
                </Text>
              </TouchableOpacity>
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>
        );
      }
    }
    return markers;
  }

  renderAlert() {
    {
      this.state.alertStatus
        ? Alert.alert(
            "¡Vaya!",
            "Parece que no tienes la ubicación activada, recuerda activarla para ver las ofertas que te rodean",
            [
              {
                text: "Cancel",
                onPress: () => {
                  this.setState({ alertStatus: false });
                },
                style: "cancel"
              },
              {
                text: "Ya la activé",
                onPress: () => {
                  this.setState({ alertStatus: false }, this.checkPosition());
                }
              }
            ],
            { cancelable: false }
          )
        : null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.checkPosition();
          }}
        />
        {this.renderAlert()}
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[this.state.longUser, this.state.latUser]}
          style={styles.container}
        >
          {this.Myposition()}
          {this.offerPosition()}
        </Mapbox.MapView>
        <View>
          <MapModal
            modalStatus={this.state.modalStatus}
            title={this.state.placeState}
            decline={() => {
              this.setState({ modalStatus: !this.state.modalStatus });
            }}
            dataFlatList={this.state.dataFiltered}
            uidUser={this.state.uidUser}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: 400,
    marginTop: 80
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    transform: [{ scale: 0.6 }]
  },
  annotationShop: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  }
});

const mapStateToProps = state => {
  const product = _.map(state.product, (val, uid) => {
    return { ...val, uid };
  });

  return { product };
};

export default connect(
  mapStateToProps,
  { productFetch }
)(MyMap);

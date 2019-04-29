import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Mapbox from "@mapbox/react-native-mapbox-gl";

Mapbox.setAccessToken(
  "Access Token"
);
export default class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latUser: 28.073222,
      longUser: -15.451476,
      alertStatus: false
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = parseFloat(position.coords.latitude);
        const long = parseFloat(position.coords.longitude);
        this.setState({ latUser: lat, longUser: long });
      },
      error => {
        this.setState({ alertStatus: true });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
  }
  renderAnnotations() {
    return (
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[this.state.longUser, this.state.latUser]}
      >
        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title="An annotation here!" />
      </Mapbox.PointAnnotation>
    );
  }

  renderAlert() {
    {
      this.state.alertStatus
        ? Alert.alert(
            "¡Vaya!",
            "Parece que no tienes la ubicacoón activada, recuerda activarla para ver las ofertas que te rodean",
            [
              {
                text: "Cancel",
                onPress: () => {this.setState({alertStatus: false})},
                style: "cancel"
              },
              { text: "OK", onPress: () => {this.setState({alertStatus: false})} }
            ],
            { cancelable: false }
          )
        : null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
      {this.renderAlert()}
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[this.state.longUser, this.state.latUser]}
          style={styles.container}
        >
          {this.renderAnnotations()}
        </Mapbox.MapView>
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
    backgroundColor: "#109C59",
    transform: [{ scale: 0.6 }]
  }
});

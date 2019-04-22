import React, { Component } from "react";
import _ from "lodash";
import { View, ListView, Text, ActivityIndicator } from "react-native";
import { placeFetch } from "../actions";
import { connect } from "react-redux";
import { ButtonOwn } from "../component";
import { Actions } from "react-native-router-flux";
import Geohash from "latlon-geohash";

var geoM;
class PlaceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  state = { noCoincidence: null };

  componentDidMount() {
    state = {
      kindProduct: this.props.values,
      kindSection: this.props.kindSectionVal
    };
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = parseFloat(position.coords.latitude);
        const long = parseFloat(position.coords.longitude);
        geoM = Geohash.encode(lat, long, 7);
        this.props.placeFetch();
      },
      error => {
        (geoM = 0), this.props.placeFetch();
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
  }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.createDataSource(newProps);
    this.setState({ loading: false });
  }

  createDataSource({ place }) {
    this.setState({ noCoincidence: place.length });
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(place);
  }

  renderRow(placeToSend) {
    return (
      <ListPlaces
        geoHashV={geoM}
        place={placeToSend}
        prodVal={this.state.kindProduct}
        kindOfProduct={this.state.kindSection}
      />
    );
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
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {this.state.noCoincidence == 0 ? (
            <View style={styles.container}>
              <Text style={styles.notFoundStyle}>
                Ha habido un error intentalo de nuevo =(
              </Text>
            </View>
          ) : null}
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const place = _.map(state.place, (val, uid) => {
    return { ...val, uid };
  });
  return { place };
};
export default connect(
  mapStateToProps,
  { placeFetch }
)(PlaceView);

class ListPlaces extends Component {
  onItemPress(value) {
    Actions.finalCreateOffer({
      placeValue: value,
      productValue: this.props.prodVal,
      productKindValue: this.props.kindOfProduct,
      // longLat: longLatV
    });
  }

  render() {
    const payment = [];
    const nearPlaces = [];
    var arr = _.values(this.props.place);
    for (var i = 0; i < arr.length - 1; i++) {
      aux = _.values(arr[i]);
      const auxStreet = aux[2];
      // const longLat = aux[1];
      if (aux[0] != this.props.geoHashV) {
        payment.push(
          <ButtonOwn
            key={aux[1]}
            value={aux[1]}
            onPress={() => this.onItemPress(auxStreet)}
            style={styles.styleList}
          >
            <Text style={{ color: "black" }}>{aux[2]}</Text>
          </ButtonOwn>
        );
      } else {
        nearPlaces.push(
          <ButtonOwn
            key={aux[1]}
            value={aux[1]}
            onPress={() => this.onItemPress(auxStreet)}
            style={styles.styleList}
          >
            <Text style={{ color: "black" }}>{aux[2]}</Text>
          </ButtonOwn>
        );
      }
    }
    return (
      <View>
        <View>
          {nearPlaces.length > 0 ? (
            <View>
              <Text style={styles.textStyle}>Supermercados Cercanos</Text>
              {nearPlaces}
            </View>
          ) : null}

          <Text style={styles.textStyle}>Otros Supermercados</Text>
          {payment}
        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    textAlign: "center",
    fontSize: 19,
    height: 27,
    backgroundColor: "#109C59",
    color: "white"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  notFoundStyle: {
    color: "grey",
    fontSize: 20,
    textAlign: "center"
  },
  styleList: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 60,
    borderColor: "grey",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0
  }
};

import React, { Component } from "react";
import _ from "lodash";
import { View, FlatList,ActivityIndicator } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { productFetch } from "../actions";
import ListProductItem from "../component/ListProductItem";
import { connect } from "react-redux";

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    this.props.productFetch()
    console.log(this.props.product)
    var arr = _.values(this.props.product)
      this.setState({
        data: arr,
        loading: false
      })
      this.arrayholder = arr
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.productValue.toUpperCase()} ${item.placeValue.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
          inputStyle={{
            backgroundColor: "white",
            color: "black"
          }}
          clearIcon
          containerStyle={{ backgroundColor: "#109C59" }}
          placeholder="Buscar..."
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListProductItem
              product = {item}
            />
          )}
          keyExtractor={item => item.uid}
          ItemSeparatorComponent={this.renderSeparator}
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
)(SearchView);

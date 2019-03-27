import _ from 'lodash';
import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";
import { productFetch } from "../actions";
import FAB from "react-native-fab";
import ListProductItem from '../component/ListProductItem';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class ListProduct extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      loading: false,
      data: [],
      error: null
    };
  }

  componentWillMount() {
  this.setState({loading: true})
  this.props.productFetch();
  this.setState({
    data: this.props.product
  })
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.product
    })
    this.setState({ loading: false})
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
          renderItem={({ item }) => <ListProductItem product={item} />}
          keyExtractor={item => item.uid}
          ListHeaderComponent={this.renderHeader}
        />
          <FAB
          buttonColor="#008000"
          iconTextColor="#FFFFFF"
          onClickAction={() => Actions.createOffer()}
          visible={true}
          
          iconTextComponent={<Icon name="md-pricetags" />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
    const product = _.map(state.product, (val, uid) => {
        return { ...val, uid};
    });

    return { product }

};

export default connect(mapStateToProps,{ productFetch })(ListProduct);

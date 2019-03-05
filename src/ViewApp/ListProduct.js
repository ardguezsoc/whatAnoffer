import _ from 'lodash';
import React, { Component } from "react";
import { ListView, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { productFetch } from "../actions";
import FAB from "react-native-fab";
import ListProductItem from '../component/ListProductItem';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class ListProduct extends Component {


  componentWillMount() {
  this.props.productFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {

    this.createDataSource(nextProps);
  }

  createDataSource({ product }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(product);
  }

  renderRow(product){
    return <ListProductItem product={product} />
  }


  render() {
    return (
    <View >
     <ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
     />
        <FAB
          buttonColor="#109C59"
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

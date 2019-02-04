import React, { Component } from "react";
import _ from 'lodash';
import { View, ListView, Text } from "react-native";
import ListKind from '../component/ListKind';
import { today, nowHour, kindFetch} from "../actions";
import { connect } from "react-redux"


class CreateOffer extends Component {
  componentWillMount() {
   this.props.kindFetch();
   this.createDataSource(this.props);
    
  }

  componentWillReceiveProps(nextProps) {

    this.createDataSource(nextProps);
  }

  createDataSource({ kindP }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(kindP);
  }

  renderRow(kindP){
    return <ListKind kindP={ kindP} />
  }

  render() {
    return (
      <View>
      <ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
     />
     </View>
    );
  }
}

const mapStateToProps = state => {
  const kindP = _.map(state.kindP, (val, uid) => {
      return { ...val, uid};
  });
  console.log(kindP)
  return { kindP }

};

export default connect( mapStateToProps,{ kindFetch })(CreateOffer);

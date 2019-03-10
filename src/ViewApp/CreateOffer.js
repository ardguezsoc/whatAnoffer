import React, { Component } from "react";
import _ from "lodash";
import { View, ListView, ActivityIndicator } from "react-native";
import ListKind from "../component/ListKind";
import { kindFetch } from "../actions";
import { connect } from "react-redux";

class CreateOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    this.setState({loading: true})
    this.props.kindFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    this.setState({loading: false})
  }

  createDataSource({ kindP }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(kindP);
  }

  renderRow(kindP) {
    return <ListKind kindP={kindP} />;
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
}

const mapStateToProps = state => {
  const kindP = _.map(state.kindP, (val, uid) => {
    return { ...val, uid };
  });
  return { kindP };
};

export default connect(
  mapStateToProps,
  { kindFetch }
)(CreateOffer);

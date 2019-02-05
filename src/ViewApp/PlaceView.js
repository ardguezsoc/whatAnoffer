import React, { Component } from "react";
import _ from 'lodash';
import { View, ListView, Text } from "react-native";
import { placeFetch } from "../actions";
import { connect } from "react-redux"
import {Button} from '../component';
import { Actions } from "react-native-router-flux";

class PlaceView extends Component {
  componentDidMount () {
    console.log(this.props.values)
    state = {kindProduct: this.props.values}
  }

  componentWillMount() {
    this.props.placeFetch();
    this.createDataSource(this.props);
    
  }
  
  componentWillReceiveProps(newProps) {
    
    this.createDataSource(newProps);
  }
  
  createDataSource({ place }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    
    this.dataSource = ds.cloneWithRows(place);
  }
  
  renderRow(placeToSend){
    return <ListPlaces place = { placeToSend } prodVal = {this.state.kindProduct}   />
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
     
     const mapStateToProps = (state) => {
       const place = _.map(state.place, (val, uid) => {
           return { ...val, uid};
       });
       return { place }
     
     };
     export default connect( mapStateToProps,{ placeFetch })(PlaceView);




  class ListPlaces extends Component {
  onItemPress(value) {
    Actions.finalCreateOffer({ placeValue: value, productValue: this.props.prodVal});
  }

  render() {
    
    const payment = [];
    const { uid } = this.props.place;
    for (var key in this.props.place) {
      if( key != "uid"){
      const val  = this.props.place[key];
      payment.push( <Button key={ this.props.place[key] } value={ this.props.place[key] } onPress={ () => this.onItemPress(val) } style={{ backgroundColor:"white", borderColor:"grey", borderWidth:0, borderBottomWidth: 1,borderRadius:0, marginLeft:0, marginRight:0}}><Text style={{color:"black"}}>{this.props.place[key]}</Text></Button>)
      }
    }
    
    return (

      <View >
        <View>
          <Text style={ styles.textStyle }>{uid}</Text>
          {payment}
        </View>
     
      </View>
    );
  }
}

const styles = {
  textStyle:{
    textAlign:'center', 
    fontSize: 18, 
    backgroundColor: "#30A66D", 
    color:"white"
  }
}



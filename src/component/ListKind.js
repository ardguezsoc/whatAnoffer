import React, { Component } from "react";
import { View, Text } from "react-native";
import {Button} from '../component';
import { Actions } from "react-native-router-flux";

class ListKind extends Component {
  onItemPress(value) {
    Actions.placeChooser({values: value});
  }

  render() {
    
    const payment = [];
    const { uid } = this.props.kindP;
    for (var key in this.props.kindP) {
      if( key != "uid"){
      const val  = this.props.kindP[key];
      payment.push( <Button key={this.props.kindP[key]} value={this.props.kindP[key]} onPress={ () => this.onItemPress(val) } style={{ backgroundColor:"white", justifyContent:'center', alignItems: 'center', borderColor:"grey", height: 60 , borderWidth:0, borderBottomWidth: 1,borderRadius:0, marginLeft:0, marginRight:0}}><Text style={{color:"black"}}>{this.props.kindP[key]}</Text></Button>)
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
export default ListKind;

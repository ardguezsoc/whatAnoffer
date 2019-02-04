import React, { Component } from "react";
import { TouchableNativeFeedback, View, Text } from "react-native";
import {Button} from '../component';
import { Actions } from "react-native-router-flux";

class ListKind extends Component {
  onItemPress(value) {
    console.log(value);
  }

  render() {
    const payment = [];
    const { uid } = this.props.kindP;
    for (var key in this.props.kindP) {
      if( key != "uid"){
      const val  = this.props.kindP[key]
      payment.push( <Button key={this.props.kindP[key]} value={this.props.kindP[key]} onPress={() => this.onItemPress(val)} style={{ backgroundColor:"white", borderColor:"grey", borderWidth:0, borderBottomWidth: 1,borderRadius:0, marginLeft:0, marginRight:0}}><Text style={{color:"black"}}>{this.props.kindP[key]}</Text></Button>)
      }
    }
    return (

      <View >
        <View>
          <Text style={{textAlign:'center', fontSize: 18, backgroundColor: "#30A66D", color:"white"}}>{uid}</Text>
          {payment}
        </View>
     
      </View>
    );
  }
}

export default ListKind;

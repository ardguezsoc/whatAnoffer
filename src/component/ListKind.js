import React, { Component } from "react";
import { View, Text } from "react-native";
import {ButtonImag} from '../component';
import { Actions } from "react-native-router-flux";

class ListKind extends Component {
  onItemPress(value, kindSection) {
    Actions.placeChooser({values: value, kindSectionVal: kindSection});
  }

  render() {
    const payment = [];
    const { uid } = this.props.kindP;
    for (var key in this.props.kindP) {
      if( key != "uid"){
      const val  = key;
      payment.push( <ButtonImag  key={key} value={this.props.kindP[key]} 
      onPress={ () => this.onItemPress(val, this.props.kindP[key]) } 
      iconUri={this.props.kindP[key]} style={styles.buttonStyle}>
      <Text style={{color:"black"}}>{key}</Text>
      </ButtonImag>)
      }
    }
    return (

      <View>
        <View >
          <Text style={ styles.textStyle }>{uid}</Text>
          <View style={{flexDirection: "row"}}>
          {payment}
          </View>
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
  },
  buttonStyle: {
    backgroundColor:"white", 
     borderColor:"black", 
     height: 120 , 
     borderRightWidth:1, 
     borderRadius:0, 
     marginLeft:0, 
     marginRight:0, 
     width: 150 
  }
}
export default ListKind;

import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Icon } from 'react-native-elements'


const CardItem = ({ title, price }) => {
  const { roundBorder, viewContainer, priceStyle, roundBorder2 } = styles;

  return (
    <View style={[roundBorder, viewContainer]}>

    <View  style={{ width: "40%", height:"100%"}}>
      <ImageBackground
        source={require("./pan.jpg")}
        style={{ width: "100%", height:"100%", marginRight:0  }}
      >
        <View style={[roundBorder2, priceStyle]}>
          <Text style={{ textAlign: "center", color: "white" }}>{price} €</Text>
        </View>
      </ImageBackground>
      </View>
      <View style={{ backgroundColor: "white", width: "60%", height: "100%"}}>
      <Icon name='md-bookmark' type='ionicon' color="green" alignSelf="flex-end" marginTop="3%" marginRight="2%"  />
      <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 18, textAlign: 'center'}}>{title}</Text>
      <Text style={{ fontSize: 14, marginTop: '3%', marginLeft: "3%"}}>Precio original: 4.50 €</Text>
      <Text style={{ fontSize: 14, marginTop: '3%', marginLeft: "3%"}}>23/12/2019</Text>
      <Text style={{ fontSize: 13, marginTop: '3%', color:'grey', marginLeft: "3%" }}>Calle Rafael Cabrera nº 23</Text>
      <Text style={{ fontFamily: 'sans-serif-medium', fontSize: 9, alignSelf: 'flex-end', bottom:0 ,color:'grey', padding:"3%"}}>5 min</Text>
      </View>
    </View>
  );
};

const styles = {
  roundBorder: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    overflow: "hidden",

    alignSelf: "center"
  },

  roundBorder2: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    alignSelf: "center"
  },

  viewContainer: {
    width: "95%",
    height: 170,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    shadowColor: "#000",
  shadowOffset: {
	  width: 0,
	  height: 2,
  },
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },

  priceStyle: {
    width: "40%",
    height: "20%",
    backgroundColor: "white",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#52A128"
  }
};

export { CardItem };

import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";


const CardItem = ({title, price}) => {
  const {
    roundBorder,viewContainer,priceStyle, roundBorder2
  } = styles;



  return (
    <View
      style={ [roundBorder, viewContainer]}
    >
      <ImageBackground
        source={require('./pan.jpg')}
        style={{ width: "100%", height: "100%",  }}
      >
      <View style={[roundBorder2, priceStyle]}>
      <Text style={{ textAlign:'center', color:"white" }} >{price} €</Text>
      </View>
      <View style={{ 
      alignSelf:'center',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
       <Avatar
          medium
          rounded
          source={{
            uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
         
        />
      <Text style={{color: "white", fontSize: 20, opacity: 1}}>{title}</Text>
      <Text style={{color: "white", fontSize: 16, opacity: 1}}>P. Sherman, calle Wallaby, 42, Sydney</Text>
      </View>
      </ImageBackground>

    </View>
  );
};

const styles= {
  roundBorder:{
    borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        overflow: "hidden",
       
        alignSelf: "center"
  },

  roundBorder2:{
   // borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
         borderBottomLeftRadius: 15,
        // borderTopLeftRadius: 15,
        overflow: "hidden",
       
        alignSelf: "center"
  },

  viewContainer: {
    width: "95%",
    height: 150,
    marginTop: 5,
    flex: 1,
  },

  priceStyle:{
    width: '20%', 
    height: '20%', 
    backgroundColor:"white", 
    alignSelf:'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#52A128'
 
  }

};

export { CardItem };

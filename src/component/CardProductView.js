import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";


const CardProductView = ({imagUrl}) => {
  const {
    viewContainer,
  } = styles;



  return (
    <View
      style={ [ viewContainer ]}
    >
      <ImageBackground
        source={{uri: imagUrl}}
        style={{ width: "100%", height: "100%",  }}
      >
      <View style={{ 
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
      }}>
       <Avatar
          large
          rounded
          source={{
            uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
         
        />
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
        borderTopRightRadius: 15,
         borderBottomLeftRadius: 15,
        overflow: "hidden",
        alignSelf: "center"
  },

  viewContainer: {
    width: "100%",
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export { CardProductView };

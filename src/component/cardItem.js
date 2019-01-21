import React from "react";
import { View, Text,  } from "react-native";
import { Avatar } from "react-native-elements";

const CardItem = () => {
    const {containerStyle,priceStyle, containerDescription, textName, textDescription} = styles;
  return (
    <View style={containerStyle}>
    
      <View style={styles.divrow}>
        <Avatar
          medium
          rounded
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
          activeOpacity={0.7}
        />
        <View>

          <Text style={[textDescription, textName]}>
            Laura Santana
          </Text>
          
          <View style={containerDescription}>
          <Text style={priceStyle}> 3.45$ </Text>
          <Text style={textDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            iaculis varius tellus et gravida. Cras vel felis eu magna volutpat
            consequat. Suspendisse non lorem nisi.
          </Text>
          
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderColor: "#ddd",
    position: "relative",
    flexWrap: "wrap"
  },
  
  containerDescription: {
    width: '95%',
         flexGrow: 1,
         flexWrap: 'wrap'
  },

  textDescription: {
    color: "black",
    marginLeft: 10,
    paddingRight: 10
    
  },

  priceStyle: {
    color: 'grey',
    marginLeft: 10
  },

  divrow: {
    flexDirection: "row"
  },

  divColumn: {
    flexDirection: "column"
  },

  textName: {
    fontWeight: "bold"
  },

  wrap: {
    flexWrap: "wrap"
  }
};



export { CardItem };

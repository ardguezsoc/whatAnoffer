import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";
import { Actions } from "react-native-router-flux";

const CardProductView = ({
  imagUrl,
  uriAvatar,
  nameOfUsr,
  ownerProduct,
  authUser
}) => {
  const { viewContainer } = styles;

  return (
    <View style={[viewContainer]}>
      <ImageBackground
        source={{ uri: imagUrl }}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {ownerProduct === authUser ? (
            <Avatar
              size="large"
              rounded
              source={{
                uri: uriAvatar
              }}
              onPress={() => Actions.ProfileView()}
            />
          ) : (
            <Avatar
              size="large"
              rounded
              source={{
                uri: uriAvatar
              }}
              onPress={() =>
                Actions.ProfileUser({
                  ownerValue: ownerProduct
                })
              }
            />
          )}
          <Text style={styles.textStyle}>{nameOfUsr}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = {
  viewContainer: {
    width: "100%",
    height: 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    textAlign: "center",
    color: "white",
    fontFamily: "Semib",
    fontWeight: "200",
    fontSize: 25,
    width: 280,
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  }
};

export { CardProductView };

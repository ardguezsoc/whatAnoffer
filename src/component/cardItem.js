import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableNativeFeedback
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";

const CardItem = ({
  title,
  priceNew,
  priceOld,
  address,
  dateProd,
  urlImag,
  likes,
  saved,
  uidUser,
  onLike,
  onDislike,
  saveOff,
  unSaveOff,
  pressItem
}) => {
  const {
    roundBorder,
    viewContainer,
    priceStyle,
    roundBorder2,
    textStyle,
    timeStyle,
    textSt
  } = styles;

  return (
    <View style={[roundBorder, viewContainer]}>
      <TouchableNativeFeedback onPress={pressItem}>
        <View style={{ width: "40%", height: "100%" }}>
          <ImageBackground
            source={{ uri: urlImag }}
            style={{ width: "100%", height: "100%", marginRight: 0 }}
          >
            <View style={[roundBorder2, priceStyle]}>
              {priceNew == "n/a" ? (
                <Text style={{ textAlign: "center", color: "white" }}>
                  {priceNew}
                </Text>
              ) : (
                <Text style={{ textAlign: "center", color: "white" }}>
                  {priceNew} €
                </Text>
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
      <View style={{ backgroundColor: "white", width: "60%", height: "100%" }}>
        <TouchableNativeFeedback onPress={pressItem}>
          <View>
            <Text
              style={{
                fontFamily: "sans-serif-medium",
                fontSize: 18,
                textAlign: "center",
                marginTop: 11
              }}
            >
              {title}
            </Text>
            {priceOld == "n/a" ? (
              <Text style={[textStyle, textSt, { fontSize: 18 }]}>
                {priceOld}
              </Text>
            ) : (
              <Text
                style={[
                  textStyle,
                  textSt,
                  {
                    textDecorationLine: "line-through"
                  }
                ]}
              >
                {priceOld}€
              </Text>
            )}
            <Text style={[textStyle]}>{dateProd}</Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: "3%",
                color: "grey",
                marginLeft: "3%"
              }}
            >
              {address}
            </Text>
          </View>
        </TouchableNativeFeedback>
        {/* <Text style={timeStyle}>5 min</Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flex: 1
          }}
        >
          {_.includes(likes, uidUser, 0) ? (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  color: "#ED4956",
                  fontSize: 15,
                  marginRight: 2
                }}
              >
                {_.size(likes)}
              </Text>
              <Icon
                name="heart"
                color="#ED4956"
                size={25}
                onPress={onDislike}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  color: "grey",
                  fontSize: 15,
                  marginRight: 2
                }}
              >
                {_.size(likes)}
              </Text>
              <Icon name="heart" color="grey" size={25} onPress={onLike} />
            </View>
          )}
          <View
            style={{
              alignItems: "flex-start",
              flex: 1,
              marginLeft: 40,
              justifyContent: "center"
            }}
          >
            {_.includes(saved, uidUser, 0) ? (
              <Icon
                name="cart-plus"
                color="green"
                size={25}
                onPress={unSaveOff}
              />
            ) : (
              <Icon name="cart-plus" color="grey" size={25} onPress={saveOff} />
            )}
          </View>
        </View>
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
  textSt: {
    color: "grey",
    fontSize: 18
  },
  timeStyle: {
    fontFamily: "sans-serif-medium",
    fontSize: 9,
    alignSelf: "flex-end",
    bottom: 0,
    color: "grey",
    padding: "3%"
  },

  roundBorder2: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    alignSelf: "center"
  },
  textStyle: {
    fontSize: 16,
    marginTop: "3%",
    marginLeft: "3%"
  },

  viewContainer: {
    width: "92%",
    height: 180,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
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

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableNativeFeedback
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CardItemIcons = ({
  title,
  priceNew,
  priceOld,
  address,
  dateProd,
  urlImag,
  likes,
  saved,
  uidUser,
  onDislike,
  saveOff,
  unSaveOff,
  pressItem,
  onRemoveNolike,
  likeStat
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
            flex: 1,
            marginTop: 10
          }}
        >
          {likeStat ? (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Icon
                name="heart"
                color="#ED4956"
                size={25}
                onPress={onDislike}
              />
              <Text
                style={{
                  alignSelf: "flex-start",
                  color: "#ED4956",
                  fontSize: 15,
                  marginLeft: 5
                }}
              >
                {_.size(likes)}
              </Text>
            </View>
          ) : (
            <View style={styles.styleHeart}>
              <Icon
                name="heart-broken"
                color="#ED4956"
                size={25}
                onPress={onRemoveNolike}
              />
            </View>
          )}
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                alignItems: "flex-start",
                flex: 1,
                marginLeft: "20%",
                justifyContent: "center"
              }}
            >
              { saved ? (
                <Icon name="cart" color="green" size={25} onPress={unSaveOff} />
              ) : (
                <Icon name="cart" color="grey" size={25} onPress={saveOff} />
              )}
            </View>
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
    marginTop: "2%",
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
  },
  styleHeart: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  }
};

export { CardItemIcons };

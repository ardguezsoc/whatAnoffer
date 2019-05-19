import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";

const MyModal = ({modalStatus, Decline, title, subTitle, Accept}) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={modalStatus}
        onBackButtonPress={ Decline }
        onBackdropPress={ Decline}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "32%",
            borderRadius: 15
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              marginTop: 10,
              marginRight: 10
            }}
          />
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Pacifico",
                fontSize: 24,
                color: "#30A66D"
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 19,
                padding: 8
              }}
            >
              {subTitle}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Button
                title="Cancelar"
                onPress={Decline}
                buttonStyle={{
                  borderRadius: 15,
                  width: 120,
                  backgroundColor: "#ff3333",
                  marginRight: 10
                }}
              />
              <Button
                title="Aceptar"
                onPress={ Accept}
                buttonStyle={{
                  marginLeft: 10,
                  backgroundColor: "#109C59",
                  borderRadius: 15,
                  width: 120
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { MyModal };

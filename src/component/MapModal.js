import React from "react";
import { View, Text, FlatList } from "react-native";
import Modal from "react-native-modal";
import {  openInMap } from "../actions";
import {ButtonOwn} from "../component"
import ListProductItem from "../component/ListProductItem";

const MapModal = ({ modalStatus, decline, title, dataFlatList, uidUser }) => {


  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={modalStatus}
        onBackButtonPress={decline}
        onBackdropPress={decline}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "99%",
            height: "99%",
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
            <FlatList
              data={dataFlatList}
              renderItem={({ item }) => (
                <ListProductItem product={item} uidUser={uidUser} hideModal={decline}  />
              )}
              keyExtractor={item => item.uid}
              ListHeaderComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pacifico",
                      fontSize: 18,
                      color: "#30A66D", 
                      marginBottom: 5
                    }}
                  >
                    {title}
                  </Text>
                </View>
              }
              ListFooterComponent={
                  <View style={{marginTop: 15}}>
                <ButtonOwn
                  onPress={() =>
                    openInMap(title)
                  }
                  style={{ borderColor: "#30A66D" }}
                >
                  <Text style={{ color: "#30A66D" }}> ¿Cómo llegar? </Text>
                </ButtonOwn>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { MapModal };

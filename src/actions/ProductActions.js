import { PRODUCT_UPDATE, PRODUCT_CREATE } from "./type";
import firebase from "@firebase/app";
import "@firebase/database";
import { Actions } from "react-native-router-flux";

export const productUpdate = ({ prop, value }) => {
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  };
};

export const productCreate = ({ title, description, date, kind, price }) => {
  //const { currentUser } = firebase.auth(); Cuando hayan usuarios
  return dispatch => {
    firebase
      .database()
      .ref(`/offer`)
      .push({ title, description, date, kind, price })
      .then(() => {
          dispatch({ type: PRODUCT_CREATE});
          Actions.home();
      })
      ;
  };
};

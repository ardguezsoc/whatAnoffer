import {
  PROFILE_FETCH_SUCCESS,
  PROFILE_UPDATE,
  NAMEPROFIL_CHANGED
} from "../actions/type";
import "@firebase/database";
import firebase from "@firebase/app";
import { Actions } from "react-native-router-flux";

export const profileUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const profileFetch = uidV => {
  return dispatch => {
    firebase
      .database()
      .ref(`/Users/${uidV}`)
      .on("value", snapshot => {
        dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const nameProfileChange = text => {
  return {
    type: NAMEPROFIL_CHANGED,
    payload: text
  };
};

export const profileEdit = ({ nameValue, uid, uriValue }) => {
  return () => {
    firebase
      .database()
      .ref(`/Users/${uid}`)
      .update({ nameOfUser: nameValue, uriPhoto: uriValue })
      .then(() => {
        Actions.pop({ refresh: { nameOfUser: nameValue, uriPhoto: uriValue } });
      });
  };
};


import { PEOPLE_FETCH_SUCCESS } from "./type";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";

export const peopleFetch = () => {
  return dispatch => {
    firebase
      .database()
      .ref(`/Users`)
      .on("value", snapshot => {
        dispatch({ type: PEOPLE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


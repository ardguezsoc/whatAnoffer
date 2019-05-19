import { NOTIFICATION_FETCH_SUCCESS } from "./type";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";
import {Actions} from "react-native-router-flux"

export const notificationFetch = () => {
  const whoKnow = firebase.auth().currentUser.uid;
  return dispatch => {
    firebase
      .database()
      .ref(`Notification/${whoKnow}`)
      .on("value", snapshot => {
        dispatch({ type: NOTIFICATION_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const updateNotif = (arrayTopics) => {
  const whoKnow = firebase.auth().currentUser.uid;
  return dispatch => {
    firebase
      .database()
      .ref(`Notification/${whoKnow}`)
      .update({ topics: arrayTopics })
      Actions.pop()
  };
};

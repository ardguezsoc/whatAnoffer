import { FOLLOW_FETCH_SUCCESS } from "./type";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";

export const followFetch = whoKnow => {
    return dispatch => {
      firebase
        .database()
        .ref(`/Follow/${whoKnow}`)
        .on("value", snapshot => {
          dispatch({ type: FOLLOW_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
  };
  
  export const followUser = (authUser, uidToFollow) => {
    return dispatch => {
      firebase
        .database()
        .ref("Follow")
        .child(`${authUser}/siguiendo/${uidToFollow}`)
        .set(`${uidToFollow}`)
        .then(() => {
          firebase
            .database()
            .ref("Follow")
            .child(`${uidToFollow}/seguidores/${authUser}`)
            .set(`${authUser}`)
            .then(() => {
              dispatch({ type: PRODUCT_CREATE });
            });
        });
    };
  };
  
  export const unFollowUser = (uidUser, following) => {
    return dispatch => {
      firebase
        .database()
        .ref(`Follow/${uidUser}/siguiendo/${following}`)
        .remove()
        .then(() => {
          firebase
            .database()
            .ref(`Follow/${following}/seguidores/${uidUser}`)
            .remove()
            .then(() => {
              dispatch({ type: PRODUCT_DELETE });
            });
        });
    };
  };
  
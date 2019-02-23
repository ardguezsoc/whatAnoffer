import { PRODUCT_UPDATE, PRODUCT_CREATE, PRODUCT_FETCH_SUCCESS, KIND_FETCH_SUCCESS, PLACE_FETCH_SUCCESS } from "./type";
import firebase from "@firebase/app";
import "@firebase/database";
import { Actions } from "react-native-router-flux";

export const productUpdate = ({ prop, value }) => {
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value } 
  };
};

export const productCreate = ({ placeValue,productValue,productKindValue,description,date,priceOld,priceNew,currentTime, urlOfImag }) => {
  const status = "read";
  return dispatch => {
    firebase
      .database()
      .ref(`/offer`)
      .push({ placeValue,productValue,productKindValue,description,date,priceOld,priceNew,currentTime, urlOfImag, status })
      .then(() => {
          dispatch({ type: PRODUCT_CREATE});
          Actions.osu();
      })
      ;
  };
};

export const productFetch = () => {

  return (dispatch) => {
    firebase.database().ref(`/offer`).orderByChild("status").equalTo("read")
    .on('value', snapshot => {
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: snapshot.val() });
    });
    };
};

export const kindFetch = () => {

  return (dispatch) => {

    firebase.database().ref(`/Product`)
    .on('value', snapshot => {
      dispatch({ type: KIND_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const placeFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/Places`)
    .on('value', snapshot => {
      dispatch({ type: PLACE_FETCH_SUCCESS, payload: snapshot.val() })
    });
  };
};

export const productEdit = ({uid,placeValue,productValue,productKindValue,description,date,priceOld,priceNew,currentTime,status,urlOfImag}) => {
  return (dispatch) => {
    firebase
    .database()
    .ref(`/offer/${uid}`)
    .set({placeValue,productValue,productKindValue,description,date,priceOld,priceNew,currentTime,status,urlOfImag})
    .then(() => {
      dispatch({ type: PRODUCT_CREATE});
        Actions.osu();
    })
    ;
  }
}

export const productDelete = ({ uid }) => {
  const status = "hidden";
  return() => {
    firebase
    .database()
    .ref(`/offer/${uid}`)
    .set({status})
    .then(() => {
      Actions.pop();
    });
  };
};

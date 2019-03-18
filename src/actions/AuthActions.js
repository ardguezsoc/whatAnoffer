import firebase from "@firebase/app";
import "@firebase/auth";
import { Actions } from "react-native-router-flux";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESETER,
  CREATE_USER_FAIL
} from "../actions/type";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const nameChanged = text => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        loginUserFail(dispatch);
      });
  };
};

export const createAccount = ({ email, password, name }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => CreateUsers(name));
      })
      .catch(() => {
        createUserFail(dispatch);
      });
  };
};

export const reseter = () => {
  return dispatch => {
    dispatch({
      type: RESETER
    });
    Actions.pop();
  };
};

export const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const createUserFail = dispatch => {
  dispatch({ type: CREATE_USER_FAIL });
};

export const reseterLogin = () => {
  return dispatch => {
    dispatch({
      type: RESETER
    });
    Actions.newUser();
  };
};

export const CreateUsers = name => {
  const { currentUser } = firebase.auth();
  firebase
    .database()
    .ref()
    .child("Users")
    .child(currentUser.uid)
    .set({
      nameOfUser: name
    })
    .then(() => {
      Actions.waoTab();
    });
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.waoTab();
};

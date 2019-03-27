import { PROFILE_FETCH_SUCCESS } from '../actions/type';
import "@firebase/database";
import firebase from "@firebase/app";


export const profileFetch = (uidV) => {
    console.log(uidV)
    return (dispatch) => {
        firebase.database().ref(`/Users/${uidV}`)
        .on('value', snapshot => {
          dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val() });
        });
        };
}
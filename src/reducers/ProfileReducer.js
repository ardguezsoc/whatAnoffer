import {
  PROFILE_FETCH_SUCCESS,
  PROFILE_UPDATE,
  NAMEPROFIL_CHANGED,
  PROFILE_CREATE
} from "../actions/type";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
      return{ ...action.payload, loader:false }


    case NAMEPROFIL_CHANGED:
      return { ...state, nameOfUsr: action.payload };

    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case PROFILE_CREATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

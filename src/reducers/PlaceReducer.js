import { PLACE_FETCH_SUCCESS } from "../actions/type";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLACE_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

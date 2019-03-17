import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "../actions/type";

const INITIAL_STATE = { email: "", password: "", load: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER:
        return {...state, error: '', load: true};

    case LOGIN_USER_SUCCESS:
        return {...state, ...INITIAL_STATE, user: action.payload}

    case LOGIN_USER_FAIL: 
        return {...state, error: 'Fallo de autenticación', password: '', load: false}

    default:
      return state;
  }
};

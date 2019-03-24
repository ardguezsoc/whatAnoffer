import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_USER_FAIL,
  RESETER,
  FAIL_PASSWORD,
  FAIL_NAME
} from "../actions/type";

const INITIAL_STATE = {
  email: "",
  password: "",
  name: "",
  load: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case NAME_CHANGED:
      return { ...state, name: action.payload };

    case LOGIN_USER:
      return { ...state, error: "", load: true };

    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Fallo de autenticación",
        password: "",
        load: false
      };

    case RESETER:
      return { ...state, error: "", load: false };

    case CREATE_USER_FAIL:
      return {
        ...state,
        error: "¡Vaya, este correo ya está en uso!",
        password: "",
        load: false
      };

    case FAIL_PASSWORD:
      return {
        ...state,
        error: "La contraseña es demasiado simple",
        password: "",
        load: false
      };

    case FAIL_NAME:
      return {
        ...state,
        error: "El nombre es demasiado corto",
        password: "",
        load: false
      };

    default:
      return state;
  }
};

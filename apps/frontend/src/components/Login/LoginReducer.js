import { Login } from './ActionType';

const initialState = {
  user: {},
  token: null,
  isloading: false,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case Login.LOGIN_REQUEST:
      return {
        ...state,
        isloading: true,
      };

    case Login.LOGIN_SUCCESS:
      console.log('Login', action);
      return {
        ...state,
        isloading: false,
        user: action.payload,
        token: action.payload.token,
      };

    case Login.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: {},
      };

    default:
      return state;
  }
}

import { Register } from './ActionType';

const initialState = {
  user: {},
  token: null,
  isLoading: false,
};

export function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case Register.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case Register.REGISTER_SUCCESS:
      return {
        isLoading: false,
        user: action.payload.data,
        token: action.payload.token,
      };

    case Register.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
}

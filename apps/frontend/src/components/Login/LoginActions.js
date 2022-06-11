import axios from 'axios';
import { Login } from './ActionType';

function login(payload) {
  console.log(payload, 'Action happened');
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post('/user/login', payload);
      if (response && response.data) {
        localStorage.setItem('token', response.token);
        response.data.token = response.token;
        debugger;
        dispatch(loginSuccess(response.data));
      }
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
}

const loginRequest = () => {
  return {
    type: Login.LOGIN_REQUEST,
  };
};
const loginSuccess = () => {
  return {
    type: Login.LOGIN_SUCCESS,
  };
};
const loginFailure = () => {
  return {
    type: Login.LOGIN_FAILURE,
  };
};

export const loginActions = {
  login,
};

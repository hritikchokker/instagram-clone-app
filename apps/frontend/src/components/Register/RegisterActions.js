import axios from 'axios';
import { Register } from './ActionType';

function register(payload) {
  console.log(payload);
  return async (dispatch) => {
    dispatch(RegisterRequest());
    try {
      const response = await axios.post('/user/register', payload);
      if (response && response.data) {
        localStorage.setItem('token', response.data.token);
        response.data.token = response.token;
        debugger;
        dispatch(RegisterSuccess(response.data));
      }
    } catch (error) {
      dispatch(RegisterFailure(error));
    }
  };
}

const RegisterRequest = () => {
  return {
    type: Register.REGISTER_REQUEST,
  };
};

const RegisterSuccess = (data) => {
  return {
    type: Register.REGISTER_SUCCESS,
    payload: data,
  };
};

const RegisterFailure = (error) => {
  return {
    type: Register.REGISTER_FAILURE,
    payload: error,
  };
};

export const registerActions = {
  register,
};

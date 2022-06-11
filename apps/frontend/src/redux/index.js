import { combineReducers } from 'redux';
import { loginReducer } from '../components/Login/LoginReducer';
import { RegisterReducer } from '../components/Register/RegisterReducer';

const rootReducer = combineReducers({
  Register: RegisterReducer,
  Login: loginReducer,
});

export default rootReducer;

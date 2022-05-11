import React from 'react';
import './index.scss';
import logoImg from '../../assets/pro-max.png';
import instagram from '../../assets/Instagram.png';

function Login() {
  return (
    <div className="Login_base">
      <div className="Login_base__container">
        <div className="Login_base__container__image">
          <img src={logoImg} alt="" />
        </div>
        <div className="Login_base__container__Wrapper">
          <div className="Login_base__container__Wrapper__login">
            <div className="Login_base__container__Wrapper__login__logo_container">
              <img src={instagram} alt="" />
            </div>
            <div className="Login_base__container__Wrapper__login_fields">
              <input type="text" placeholder="Username, email" />
              <input type="password" placeholder="Password" />
              <button type="button" disabled>
                Log In
              </button>
              <h6>-----OR-----</h6>
              <div className="login_facebook">Log in with Facebook</div>
              <div className="forgot_password">Forgot Password ?</div>
            </div>
          </div>
          <div className="Login_base__container__Wrapper__signUp">
            <div>
              Don't have an account? <span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginActions } from './LoginActions';
import instagram from '../../assets/Instagram.png';
import logoImg from '../../assets/pro-max.png';
import './index.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate;

  // const token = useSelector((state) => console.log(state));
  const token = useSelector((state) => state.Login.token);

  useEffect(() => {
    if (token) {
      navigate('./MainBody', { replace: true });
    }
  }, [token]);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(loginActions.login(values));
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                    <input
                      type="text"
                      placeholder="Username, email"
                      onChange={handleChange('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={handleChange('password')}
                      value={values.password}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.email}</div>
                    ) : null}
                    <button type="submit" onClick={handleSubmit}>
                      Log In
                    </button>
                    <h6>-----OR-----</h6>
                    <div className="login_facebook">Log in with Facebook</div>
                    <div className="forgot_password">Forgot Password ?</div>
                  </div>
                </div>
                <div className="Login_base__container__Wrapper__signUp">
                  <div>
                    Don't have an account? <a href="/Register">Sign up</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
export default Login;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email Entered').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

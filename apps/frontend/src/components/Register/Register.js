import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerActions } from './RegisterActions';
import { useNavigate } from 'react-router';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = useSelector((state) => console.log(state));
  const token = useSelector((state) => state.Register.token);

  useEffect(() => {
    if (token) {
      navigate('/MainBody');
    }
  }, [navigate, token]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same as initial values
          console.log(values);
          dispatch(registerActions.register(values));
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div>
            <div>
              <input
                placeholder="Firstname"
                type="text"
                onChange={handleChange('firstName')}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </div>
            <div>
              <input
                placeholder="Lastname"
                type="text"
                onChange={handleChange('lastName')}
                value={values.lastName}
              />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
            </div>
            <div>
              <input
                placeholder="Email"
                type="text"
                onChange={handleChange('email')}
                value={values.email}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                onChange={handleChange('password')}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div>
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
export default Register;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[a-zA-Z]+$/, 'Only letters allowed')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

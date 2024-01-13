import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authSchema from '../utils/authSchema';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4100/api/login', values);
        console.log('Login successful', response.data.access_token);
        onLogin(response.data.access_token)
        localStorage.setItem('jwtToken', response.data.access_token);
        if (response.data.statusCode === 200) {
          toast.success('Login success...')
          navigate('/home');
        } else {
          navigate('/');
        }
      } catch (error) {
        toast.error('Invalid Credentials')
        console.error('Login failed');
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">Login</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label className="login-label">Email:</label>
          <input
            className="login-input"
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <p className="login-error">{formik.errors.email}</p>}

          <label className="login-label">Password:</label>
          <input
            className="login-input"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <p className="login-error">{formik.errors.password}</p>}

          <button className="login-button" type="submit">
            Login
          </button>
          <span className='register-link'>Back to register? <a href='/register'>Register Here</a></span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

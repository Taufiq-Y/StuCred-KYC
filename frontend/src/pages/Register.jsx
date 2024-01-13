import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import authSchema from '../utils/authSchema';
import './register.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: async (values) => {
      try {
        const resp = await axios.post('http://localhost:4100/api/register', values);
        toast.success(resp.data.message)
      } catch (error) {
        toast.error(error.response.data)
        console.error('Registration failed', error.response.data);
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-header">Register</h1>
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <label className="register-label">Email:</label>
          <input
            className="register-input"
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <p className="register-error">{formik.errors.email}</p>}

          <label className="register-label">Password:</label>
          <input
            className="register-input"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && <p className="register-error">{formik.errors.password}</p>}

          <button className="register-button" type="submit">
            Register
          </button>
          <span className='login-link'>Already a student? <a href='/'>Login Here</a></span>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from 'react';
import { Form, Field, Formik, ErrorMessage } from "formik";
import { object, string, ref } from 'yup';
import axios from 'axios';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import BASE_URL from '../components/BaseUrl'

export default function Singup() {

  const formRef = useRef();

  const messageSchema = object({
    name: string().required("* Name is required").min(3).max(30),
    contact: string().required("* Contact is required").min(9).max(13),
    email: string().required("* Email is required").email(),
    password: string().required("* Password is required").min(8).max(16),
    confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('* Confirm Password is required'),
  });

  const initialValues = {
    name: "",
    contact: "",
    email: "",
    password: "",
    role: "admin"
  };

  const handleSubmit = (values) => {
    console.log(values)
    axios.post(`${BASE_URL}/user/signup`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('Form submitted successfully', res.data);
      Swal.fire({
        title: 'Created successfully',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: 'Black'
      }).then(() => {
        formRef.current.reset();
      })
    })
      .catch(error => {
        console.error('Form submission error', error);
      });
  };

  return (
    <div>
      <NavBar />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={messageSchema} >
        <div className='container my-3'>
          <div className="create-wrapper m-auto" style={{ width: '600px' }}>
            <h2 className="mb-4 text-center">Sign up</h2>
            <Form ref={formRef}>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" className="form-control" id="studentName" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <Field type="text" className="form-control" id="studentName" name="contact" />
                <ErrorMessage name="contact" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="text" className="form-control" id="studentName" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" className="form-control" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <div className="text-center mx-3">
                <button type="submit" className='btn btn-dark'>Sign up</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
      <Footer />
    </div>
  );
}

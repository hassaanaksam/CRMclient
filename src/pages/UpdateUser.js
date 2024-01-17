import React from 'react'
import { Form, Field, Formik, ErrorMessage } from "formik";
import { object, string } from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import NavBar from '../components/NavBar';

export default function UpdateUser() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const messageSchema = object({
    name: string().required(" * Name is required").min(3).max(30),
    contact: string().required(" * Contact is required").min(9).max(13),
    email: string().required(" * Email is required").email(),
    password: string().required(" * Password is required").min(8).max(16)
  })

  const initialValues = {
    name: "",
    contact: "",
    email: "",
    password: ""
  };

  const handleSubmit = (values) => {
    axios.put(`${process.env.BASE_URL}/user/user/${userId}`, values, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('Form submitted successfully', res.data);
      Swal.fire({
        title: 'Updated successfully',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: 'Black'
      }).then(() => {
        navigate('/userdata');
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
        <div className='container d-flex align-items-center justify-content-center vh-100'>
          <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
            <h2 className="mb-8 text-center">Update user</h2>
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" className="form-control" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">Contact</label>
                <Field type="tel" className="form-control" id="contact" name="contact" />
                <ErrorMessage name="contact" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="text" className="form-control" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" className="form-control" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className="text-center mb-3">
                <button type="submit" className='btn btn-dark'>Update user</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
      <Footer />
    </div>
  );
}

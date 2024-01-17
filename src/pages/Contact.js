
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import NavBar from '../components/NavBar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRef } from 'react';
import Footer from '../components/Footer'

export default function Contact() {

  const formRef = useRef();
  const messageSchema = object({
    name: string().required("Name is Required").min(3).max(30),
    email: string().required("Email is Required").email(),
    message: string().required("Please write some message").max(200)
  })

  const initValue = {
    name: '',
    email: '',
    message: ''
  }

  const handleSubmit = (values) => {

    axios.post("http://localhost:5000/contact/contact", values, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log('Form submitted successfully', res.data);
      Swal.fire({
        title: 'Send successfully',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonColor: 'Black'
      }).then(() => {
        formRef.current.reset()
      })
    })
      .catch(error => {
        console.error('Form submission error', error);
      });
  };

  return (
    <>
      <NavBar />
      <Formik initialValues={initValue} validationSchema={messageSchema} onSubmit={handleSubmit}>
        <div className='container d-flex align-items-center justify-content-center vh-100'>
          <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
            <h2 className="mb-8 text-center">Contact us</h2>
            <Form ref={formRef}>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" className="form-control" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="text" className="form-control" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <Field as="textarea" className="form-control" id="message" name="message" rows="3" />
                <ErrorMessage name="message" component="div" className="text-danger" />
              </div>

              <div className="text-center mb-3">
                <button type="submit" className='btn btn-dark'>Send Message</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
      <Footer />
    </>
  );
}

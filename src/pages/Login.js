
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import Footer from '../components/Footer'

export default function Login() {

  const [isLeft, setIsLeft] = useState(false);

  const handleMouseEnter = () => {
    const errorElements = document.querySelectorAll('.error-message');
    const hasErrors = Array.from(errorElements).some((element) => element.textContent.trim() !== '');
    if (hasErrors) {
      setIsLeft(!isLeft);
    }

  };

  const buttonStyle = {
    marginLeft: isLeft ? '-300px' : '0',
  };

  const navigate = useNavigate();

  const messageSchema = object({
    email: string().required(" Email is required").email(),
    password: string().required(" Password is required").min(8).max(16)
  })

  const initialValues = {
    email: "",
    password: ""
  };

  const handleSubmit = (values) => {
    axios.post(`${process.env.BASE_URL}/user/login`, values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        if (res.data) {
          console.log('Login successful', res.data);
          Swal.fire({
            title: 'Logged in successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonColor: 'Black'
          }).then(() => {
            navigate('/');
            window.location.reload();
          })
        } else {
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('Login error', error)
        Swal.fire({
          title: 'Login failed',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          confirmButtonColor: 'Black'
        }).then(() => {
          window.location.reload();
        });
      })
  }
  return (
    <div className='bg-light'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={messageSchema} >
        <div className='container d-flex align-items-center justify-content-center vh-100'>
          <div className='card shadow p-4 w-30 my-3 mx-auto' style={{ width: '500px' }}>
            <h2 className="mb-8 text-center">Welcome to CRM</h2><br />
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="text" className="form-control" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger error-message" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" className="form-control" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger error-message" />
              </div>
              <div className="text-center mx-3">
                <button type="submit" className='btn btn-dark' id="slidingButton" onMouseEnter={handleMouseEnter} style={buttonStyle}>Log in</button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
      <Footer />
    </div>
  );
}

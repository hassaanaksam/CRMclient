import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import NavBar from '../components/NavBar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import BASE_URL from '../components/BaseUrl'

export default function SendSms() {
  const { contact } = useParams();
  const formRef = useRef();

  const messageSchema = object({
    to: string().required("Phone number is required"),
    body: string().required("Please write some message").max(200)
  })

  const initValue = {
    to: contact,
    body: ''
  }

  const handleSubmit = (values) => {

    axios.post(`${BASE_URL}/customer/sendsms`, values, {
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
    <div>
      <NavBar />
      <Formik initialValues={initValue} validationSchema={messageSchema} onSubmit={handleSubmit}>
        <div className='container d-flex align-items-center justify-content-center vh-100'>
          <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
            <h2 className="mb-8 text-center">Send SMS</h2>
            <Form ref={formRef}>

              <div className="mb-3">
                <label htmlFor="to" className="form-label">Contact</label>
                <Field type="tel" className="form-control" id="to" name="to" value={contact} />
                <ErrorMessage name="to" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="body" className="form-label">Message</label>
                <Field as="textarea" className="form-control" id="body" name="body" rows="3" />
                <ErrorMessage name="body" component="div" className="text-danger" />
              </div>

              <div className="text-center mb-3">
                <button type="submit" className='btn btn-dark'>Send Message</button>
              </div>

            </Form>
          </div>
        </div>
      </Formik>
      <Footer />
    </div>
  )
}

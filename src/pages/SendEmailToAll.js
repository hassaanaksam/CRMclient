import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string, array } from 'yup';
import NavBar from '../components/NavBar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer'

export default function SendEmailToAll() {

    const [emails, setEmails] = useState([]);
    const formRef = useRef();

    const handleSubmit = (values) => {
        values.to = emails;          // to field assigned emails here
        axios.post(`http://localhost:5000/customer/sendemails`, values, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log('Form submitted successfully', res.data);
            Swal.fire({
                title: 'Send Emails successfully',
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
                console.error('Form submission error', values);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/customer/allemails')
            .then(response => {
                setEmails(response.data);
            })
            .catch(error => {
                console.log('Error fetching user emails: ', error.message);
            });
    }, []);

    const messageSchema = object({
        subject: string().required("Subject is Required").min(3).max(50),
        message: string().required("Please write some message").max(1000),
        to: array().of(string().email())
    })

    const initValue = {
        to: emails,
        subject: '',
        message: ''
    }

    return (
        <>
            <NavBar />
            <Formik initialValues={initValue} validationSchema={messageSchema} onSubmit={handleSubmit}>
                <div className='container d-flex align-items-center justify-content-center'>
                    <div className='card p-4 w-50 my-3 mx-auto' style={{ width: '600px' }}>
                        <h2 className="mb-8 text-center">Send Emails</h2>
                        <Form ref={formRef}>
                            <label htmlFor="to" className="form-label">Emails</label>
                            {
                                emails.map((val, index) => {
                                    const email = val
                                    return (
                                        
                                            <div className="mb-3" key={index}>
                                                <Field type="text" className="form-control" id={`to-${index}`} name={`to[${index}]`} value={email} />
                                                <ErrorMessage name={`to[${index}]`} component="div" className="text-danger" />
                                            </div>
                                    )
                                })
                            }
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <Field type="text" className="form-control" id="subject" name="subject" />
                                <ErrorMessage name="subject" component="div" className="text-danger" />
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
    )
}

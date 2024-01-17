import React from 'react'
import { Form, Field, Formik, ErrorMessage } from "formik";
import { object, string } from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'

export default function UpdateCustomer() {

    const navigate = useNavigate();
    const { customerId } = useParams();
    const messageSchema = object({
        name: string().required(" * Name is required").min(3).max(30),
        address: string().required(" * Address is required").min(10).max(100),
        contact: string().required(" * Contact is required").min(9).max(13),
        email: string().required(" * Email is required").email()
    })

    const initialValues = {
        name: "",
        address: "",
        contact: "",
        email: ""
    };

    const handleSubmit = (values) => {
        axios.put(`http://localhost:5000/customer/customer/${customerId}`, values, {
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
                navigate('/customerdata');
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
                        <h2 className="mb-8 text-center">Edit Customer</h2>
                        <Form>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field type="text" className="form-control" id="name" name="name" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <Field type="text" className="form-control" id="address" name="address" />
                                <ErrorMessage name="address" component="div" className="text-danger" />
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

                            <div className="text-center mb-3">
                                <button type="submit" className='btn btn-dark'>Update customer</button>
                            </div>

                        </Form>
                    </div>
                </div>
            </Formik>
            <Footer />
        </div>
    )
}

import axios from 'axios'
import NavBar from '../components/NavBar';
import React, { useEffect, useState, useRef } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'

export default function UserData() {

    const tableRef = useRef();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    async function userData() {
        const response = await axios.get(`${process.env.BASE_URL}/user/user`)
        setData(response.data.user)
    }

    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.BASE_URL}/user/delete/${id}`)
                    .then((res) => {
                        Swal.fire({
                            title: 'Deleted',
                            text: "Your file has been deleted",
                            icon: 'success',
                            confirmButtonColor: 'Black',
                            confirmButtonText: 'Ok'
                        })
                            .then(() => {
                                userData();
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        });
    }

    const filteredData = data.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toString().includes(searchQuery.toLowerCase()) ||
          customer.contact.includes(searchQuery)
        );
      });

    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        userData();
    }, [])

    return (
        <>
            <NavBar /><br />
            <h2 className='customer-data my-2'>User Data</h2><br />
            <div className='container d-flex align-items-center justify-content-center'>
                <div className="create-wrapper m-auto" style={{ width: '600px' }}>
                    <form className="d-flex" role="search">
                        <input className="form-control m-3"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </form>
                </div>
            </div>
            <div className='container d-flex align-items-center justify-content-center '>
                <div className='card p-4 w-100 my-3 mx-auto' style={{ width: 'auto' }}>
                    <TableContainer ref={tableRef}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    sortedData.map((val, index) => {
                                        const { name, email, contact, _id } = val
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{email}</TableCell>
                                                <TableCell>{contact}</TableCell>
                                                <TableCell>
                                                    <Link to={`/updateuser/${_id}`}><Button>Edit</Button></Link>
                                                    <Button onClick={() => handleDelete(_id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Footer />
        </>
    )
}

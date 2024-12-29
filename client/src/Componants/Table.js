import React, { useState, useEffect } from 'react'
import { SlCalender } from "react-icons/sl";
import { FaClipboardList } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Table = () => {

    const [tables, setTables] = useState([]);
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isloading,setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/booktable')
            .then(res => setTables(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleClickOpen = async (no) => {
        setIsLoading(true);
        const tableno = parseInt(no);     
        setOpen(true);
        try {
            const response = await axios.get('http://localhost:5000/api/getorder',{ params: { tableno }});
            const data = await response.data;
           setOrders(data.items)

        } catch (error) {
            console.log(error);

        }
        setIsLoading(false)
    };

    const handleClose = () => {
        setOpen(false);
        setOrders([]);
    };

    const statusStyle = (status) =>{
        if(status === "not started"){
            return {backgroundColor:"#DC3545",color:"white"}
        }
        if(status === "preparing"){
            return {backgroundColor:"#E69D34",color:"white"}
    
        }
        if(status === "ready"){
            return {backgroundColor:"#28A745",color:"white"}
    
        }
    }
    const statusDotStyle = (status) =>{
        if(status === "not started"){
            return {color:"#7F1D1D"}
        }
        if(status === "preparing"){
            return {color:"#f1c40f "}
        }
        if(status === "ready"){
            return {color:"#1d8348"}
        }
    
    }


    return (
        <>
            <div className="container">
                {(tables.length === 0) ? <h1 className='text-2xl'>No Bookings Available</h1> : ''}

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {
                        tables.map((item) => {
                            return (
                                <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden w-full relative mt-2 hover:scale-[1.05] duration-300">
                                    <div className="">
                                        {/* Left Section */}
                                        <div className="md:flex-shrink-0 bg-purple-600  w-full  p-6">
                                            <div className="text-white text-center">
                                                <div className="text-5xl font-bold">{item.tableno}</div>
                                                <div className="mt-2 text-purple-200">Table Number</div>
                                            </div>
                                        </div>
                                        {/* Right Section */}
                                        <div className="p-8">
                                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                                customer
                                            </div>
                                            <h2 className="mt-2 text-2xl leading-tight font-bold text-gray-900">
                                                {item.fname}
                                            </h2>
                                            <div className="mt-4 flex flex-wrap">
                                                {/* Person Count */}
                                                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                                    <div className="text-sm text-gray-600">Person Count</div>
                                                    <div className="mt-1 text-lg font-semibold dark:text-black">{item.person}</div>
                                                </div>
                                                {/* Date */}
                                                <div className="w-full md:w-1/2 absolute top-0 left-2">
                                                    <div className="mt-1 text-md font-semibold text-white flex  space-x-2"><SlCalender className='mt-1' /><div className='flex flex-col'><span>{item.date}</span><span>{item.time}</span></div></div>
                                                </div>
                                            </div>
                                            {/* Confirmation Badge */}
                                            {/* <div className="mt-4">
                                           
                                        </div> */}
                                            <div className="mt-4 flex justify-between">
                                                <Link to={`/menu/${item.tableno}`} className='w-[80px] bg-[#9333EA] py-1 px-2 flex items-center rounded text-white hover:text-neutral-50'><FaClipboardList />
                                                    Menu
                                                </Link>
                                                <button className='bg-green-500 hover:bg-green-600 py-1 px-2 rounded'
                                                    onClick={() => handleClickOpen(item.tableno)}
                                                >View Orders</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>


                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent className='dark:bg-slate-900'>

                        <table className="min-w-full bg-white dark:bg-slate-700 dark:text-white shadow-md rounded-lg overflow-hidden ">
                            <thead className="bg-gray-50 dark:bg-slate-800 ">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                 {
                                    (isloading)? <div className='w-100 flex justify-center'> 
                                        <h1>Loading...</h1>
                                    </div> :
                                    (orders.length == 0) ? <tr><td>No Orders Available</td></tr>
                                        :
                                        orders.map((items, index) => {
                                            const data = items.item;
                                            const status = items.status;
                                           
                                            return (
                                                <tr key={index} className='hover:bg-slate-200 dark:hover:bg-slate-600'>
                                                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2"><img width={70} src={`http://localhost:5000/uploads/${data.image}`} /><span>{data.food}</span></td>
                                                    <td className="px-0 py-4 text-center whitespace-nowrap">{data.prize}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {items.qty}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-black"
                                                        style={statusStyle(status)}
                                                        >
                                                            <svg
                                                                className="mr-2 h-2 w-2"
                                                                style={statusDotStyle(status)}
                                                                fill="currentColor"
                                                                viewBox="0 0 8 8"
                                                            >
                                                                <circle cx={4} cy={4} r={3} />
                                                            </svg>
                                                           {items.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </table>
                    </DialogContent>
                    <div className="flex justify-between items-center dark:bg-slate-800">
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default Table
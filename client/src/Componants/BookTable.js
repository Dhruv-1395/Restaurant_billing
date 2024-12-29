import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import '../Css/BookTable.css'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const BookTable = () => {
    const [tableno, setTableNo] = useState('');
    const [fname, setFname] = useState('');
    const [phone, setPhone] = useState('');
    const [person, setPerson] = useState('');
    const [tabinfo, setTabInfo] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/booktable')
            .then(res => setTabInfo(res.data))
            .catch(err => console.log(err));
    }, [])

    const bookedtab = useMemo(() => {
        return tabinfo.map(item => parseInt(item.tableno));
    }, [tabinfo]);






    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date().getDate();
        const month = months[new Date().getMonth()];
        const year = new Date().getFullYear();
        const hrs = new Date().getHours();
        const min = new Date().getMinutes();

        if (tableno === '') {
            toast.error("Please select table number!");
            return;
        } else if (fname == '' || phone == '' || person == '') {
            toast.error("Please fill the all details!");
            return;
        } else if (person < 0 || person > 6) {
            toast.error("Person must be 1 to 5!");
            return;
        }
        else {
            axios.post('http://localhost:5000/api/book', { tableno: tableno, fname: fname, phone: phone, person: person, date: `${date} ${month} ${year}`, time: `${hrs}:${min}` })
                .then(res => {
                    if (res) {
                        toast.success("Table Booking Successfully!");
                        setFname('');
                        setPerson('');
                        setPhone('');
                        setTableNo('');
                    }
                })
                .catch(err => console.log(err));
        }

    }
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full mx-auto">
                <div className="bg-indigo-600 text-white p-6">
                    <h2 className="text-2xl font-semibold">Table Reservation</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6 dark:text-black">
                    <div>
                        <label
                            htmlFor="table-number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Table Number
                        </label>
                        <select

                            name="table-number"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-black  border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={tableno}
                            onChange={(e) => setTableNo(e.target.value)}
                        >
                            <option value="non">Select a table</option>
                            {
                                [...Array(10)].map((_, i) => {
                                    const tableNumber = i + 1;
                                    const isBooked = bookedtab.includes(tableNumber);
                                    return (

                                        <option
                                            style={isBooked ? { textDecoration: 'line-through', color: 'red', fontWeight: 'bold' } : {}}
                                            className='text-green-500'
                                            key={i + 1} value={i + 1} disabled={isBooked}>Table {i + 1} {isBooked ? 'Booked' : ''}

                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="customer-name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customer-name"
                            name="customer-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                            placeholder="Enter your name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone-number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone-number"
                            name="phone-number"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="person-count"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Number of Persons
                        </label>
                        <input
                            type="number"
                            id="person-count"
                            name="person-count"
                            min={1}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                            placeholder="Enter number of persons"
                            value={person}
                            onChange={(e) => setPerson(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit Reservation
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookTable
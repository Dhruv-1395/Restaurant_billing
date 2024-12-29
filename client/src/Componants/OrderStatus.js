import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'


const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [status,setStatus] = useState('');
    


    useEffect(() => {
        const data = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/allorder');
                const data = response.data;
                const sortdata = await data.sort((a, b) => a.tableno - b.tableno);

                setOrders(sortdata);

            } catch (error) {
                console.log(error);

            }
        }
        data();
    }, [status])

    const handleChange = async (e,id,index) => {
        const status = e.target.value;
        
        
        try {
            const response = await axios.put(`http://localhost:5000/api/status/${id}/${index}`, { status })
            .then(res => {
                if(res){toast.success(res.data.msg)}
                setStatus(status+index)
            })
            .catch(err => console.log(err))
        } catch (error) {
            console.error("Error updating order status:", error.response || error.message);
        }
    }

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
    if(status === "not-started"){
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
        <div className='container'>
            <table className="min-w-full bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden table-auto ">
                <caption className="text-lg font-bold p-4 bg-[#E69D34]  dark:text-white ">
                    Orders Status
                </caption>
                <thead className="bg-gray-50 dark:bg-slate-800 ">
                    <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Table No
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        (orders.length == 0) ? <tr><td>No Orders Available</td></tr>
                            :
                            orders.map((items, index) => {
                                const data = items.items;
                                const tableno = items.tableno;
                                const id = items._id;


                                return (

                                    data.map((i, ind) => {
                                        const e = i.item;
                                        const status = i.status;
                                        console.log(status);
                                        
                                        return (
                                            <tr key={e._id} className='hover:bg-slate-200 dark:hover:bg-slate-600'>
                                                <td className="px-0 py-4 text-center whitespace-nowrap">{tableno}</td>
                                                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2"><img width={70} src={`http://localhost:5000/uploads/${e.image}`} /><span>{e.food}</span></td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {i.qty}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  text-black"
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
                                                        {i.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={i.status}
                                                        onChange={(e)=>handleChange(e,id,ind)}
                                                        className="status-select border rounded px-2 py-1 text-black"  >
                                                        <option value="not-started">Not Started</option>
                                                        <option value="preparing">Preparing</option>
                                                        <option value="ready">Ready</option>
                                                    </select>

                                                </td>
                                            </tr>
                                        );

                                    })
                                )
                            })

                    }

                </tbody>
            </table>
        </div>
    )
}

export default OrderStatus
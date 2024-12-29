import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FaHandPointRight, FaClipboardList } from "react-icons/fa";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { IoCloseCircle } from "react-icons/io5";
const MenuList = () => {

  const [fooditem, setFoodItem] = useState([]);
  const [additems, setAddItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { no } = useParams();
  // console.log(additems);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getfood')
      .then(res => setFoodItem(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleClickOpen = () => {
    if (additems.length == 0) {
      toast.error("No Items Added!");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (id) => {
    const qty = document.getElementById(id).value;

    if (qty == 0) {
      toast.error("Add Quantity!");
      return;
    }
    else {
      const item = fooditem.find((item) => item._id == id);
      setAddItems([...additems, { item, qty,status:'not started' }]);
      toast.success("Item Added!");
    }
  }

  const HandleRemove = (id) => {
    const removedItem = additems.filter((_, index) => index !== id);
    setAddItems(removedItem);
    toast.success("Item Removed!");

  }

  const handleOrder = () =>{
    console.log(additems);
    
    const tableno = parseInt(no);
    axios.post('http://localhost:5000/api/Order',{tableno:tableno,items:additems})
    .then(res => {
      
      if(res){
        toast.success("Order Placed!");
        setAddItems([]);
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='w-full'>
      <div className=" mx-auto p-4">
        {
          (!no)?"":<div className="flex items-center space-x-2 text-[18px] my-3">
          <h1>View Items </h1>
          <FaHandPointRight />
          <FaClipboardList
            className='bg-yellow-400 p-1 text-3xl rounded-full cursor-pointer'
            onClick={handleClickOpen}
          />
          <sup>{additems.length}</sup>
        </div>
        }
        <table className="min-w-full bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden table-auto">
          <caption className="text-lg font-bold p-4 bg-gray-200 dark:bg-slate-600 dark:text-white">
            Restaurant Menu
          </caption>
          <thead className="bg-gray-50 dark:bg-slate-800 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                Price
              </th>
              {
                (!no) ? "" : <><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Quantity
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                    Action
                  </th>
                </>
              }

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              fooditem.map((item, index) => {
                return (
                  <tr key={item._id} className='hover:bg-slate-200 dark:hover:bg-slate-600'>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2"><img width={70} src={`http://localhost:5000/uploads/${item.image}`} /><span>{item.foodname}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.prize}</td>
                    {
                      (!no) ? "" : <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            id={item._id}
                            type="number"
                            min={0}
                            defaultValue={0}
                            className="w-16 p-1 focus:outline-none border  rounded  dark:text-white dark:bg-slate-600 "
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAdd(item._id)}
                          >
                            Add
                          </button>
                        </td>
                      </>
                    }

                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center mt-5">

      </div>

      {/* dialogue-box */}

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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
             
              {
                additems.map((items,index)=>{
                  const qty = items.qty;
                  const data = items.item

                  return (
                    <tr key={index} className='hover:bg-slate-200 dark:hover:bg-slate-600'>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-2"><img width={70} src={`http://localhost:5000/uploads/${data.image}`} /><span>{data.foodname}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.prize}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         {qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <IoCloseCircle
                          className='text-3xl cursor-pointer'
                          onClick={() => HandleRemove(index)}
                         />
                      </td>
                     </tr>
                  );
                  
                })
              }
                
            </tbody>
          </table>
        </DialogContent>
        <div className="flex justify-between items-center dark:bg-slate-800">
          <button
           className=' bg-green-500 hover:bg-green-600 py-1 px-5 mx-2 rounded'
           onClick={handleOrder}
           >Order</button>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </div>

      </Dialog>
    </div>
  )
}

export default MenuList
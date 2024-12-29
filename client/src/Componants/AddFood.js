import React,{useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const AddFood = () => {
const [foodname,setFoodName] = useState('');
const [prize,setPrize] = useState('');
const [foodimg, setFoodImg] = useState(null);

const handleSubmit = async (e) =>{
  e.preventDefault();
  const formData = new FormData();
    formData.append('foodname', foodname); // Append text fields
    formData.append('prize', prize);
    formData.append('foodimg', foodimg);
  try {
    await axios.post('http://localhost:5000/api/addfood',formData)
    .then(res =>{
      if(res){
        toast.success(res.data.message)
      }
    })
    .catch(err => console.log(err))
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full mx-auto">
    <div className="bg-indigo-600 text-white p-6">
        <h2 className="text-2xl font-semibold text-center">Add Food</h2>
    </div>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 space-y-6 dark:text-black">
        <div>
            <label
                htmlFor="food-name"
                className="block text-sm font-medium text-gray-700"
            >
                Food Name
            </label>
            <input
                type="text"
                id="customer-name"
                name="customer-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                placeholder="Enter Food Name"
                value={foodname}
                onChange={(e) => setFoodName(e.target.value)}
            />
        </div>
        <div>
            <label
                htmlFor="prize"
                className="block text-sm font-medium text-gray-700"
            >
                Prize
            </label>
            <input
                type="number"
                id="prize"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                placeholder="Enter prizer"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
            />
        </div>
        <div>
            <label
                htmlFor="person-count"
                className="block text-sm font-medium text-gray-700"
            >
                Image
            </label>
            <input
                type="file"
                name="foodimg"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-[15px] border-gray-300 p-2 rounded"
                placeholder="Enter number of persons"
                onChange={(e) => setFoodImg(e.target.files[0])}
            />
        </div>
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
               Add Food
            </button>
        </div>
    </form>
</div>
  )
}

export default AddFood
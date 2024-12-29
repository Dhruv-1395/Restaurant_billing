import mongoose from "mongoose";

const Orders = mongoose.Schema({
    tableno:{
        type: Number,
        required: true
    },
    items:[],
    
})

export default mongoose.model("orders",Orders);
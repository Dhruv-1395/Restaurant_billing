import mongoose from 'mongoose';

const BookTableSchema = mongoose.Schema({
    tableno: {
        type: Number,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    person: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time:{
        type:String,
        required:true
    }
});

// Export the model
export default mongoose.model('booktable', BookTableSchema);

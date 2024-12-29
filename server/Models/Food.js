import mongoose from 'mongoose';

const FoodSchema = mongoose.Schema({
   
    foodname: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    
});

// Export the model
export default mongoose.model('food', FoodSchema);

import express from 'express'
const router = express.Router();
import BookTable from '../Models/BookTable.js';



router.get('/booktable',async(req,res)=>{
    try {
        const data = await BookTable.find();
    res.status(200).send(data)
    } catch (error) {
        console.log(error);
        
    }
    
})


router.post('/book',async (req,res)=>{
    try {
        const {tableno, fname, phone, person, date,time} = await req.body;
        // console.log(tableno, fname, phone, person, date,time);
        
        
        if (!tableno || !fname || !phone || !person || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new booking document
        const newBooking = new BookTable({
            tableno,
            fname,
            phone,
            person,
            date,
            time
        });

        // Save the document to the database
        const savedBooking = await newBooking.save();

        // Send success response
        res.status(201).json({ message: "Booking added successfully", data: savedBooking });

    } catch (error) {
        console.log(error);
        
    }

    
})

export default router;
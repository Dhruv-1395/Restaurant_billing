import express from "express";
import multer from 'multer';
import crypto from 'crypto'
import path from 'path';
import Food from "../Models/Food.js";
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
     crypto.randomBytes(10,function (err,bytes){
        const uniquefile = bytes.toString("hex")+path.extname(file.originalname);
        cb(null, uniquefile)

     })
    }
  })

  const upload = multer({ storage: storage });

router.post('/addfood',upload.single('foodimg'),async(req,res)=>{
const {filename} = req.file; 
const {foodname,prize} = req.body;  
try {
    await Food.create({
        foodname,
        prize,
        image:filename
    })

    res.status(200).json({message:'item added!'});
} catch (error) {
    console.log(error);
    
}
    
})

//get food data

router.get('/getfood',async (req,res)=>{
    try {
        const data = await Food.find();
        res.status(200).send(data);
    } catch (error) {
        
    }
})

export default router
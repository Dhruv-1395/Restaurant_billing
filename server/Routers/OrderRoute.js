import express from 'express'
import Orders from '../Models/Orders.js';


const router = express.Router();

router.post('/order',async (req,res)=>{
    const {tableno,items} = req.body;
    
    try {
        const table = await Orders.findOne({tableno});
        
        if(!table){
           await Orders.create({
                tableno,
                items
            })
            return res.status(201).json({message:'order placed!'});
        }
        else{
            table.items.push(...items);
            await table.save(); 
            return res.status(201).json({message:'order placed!'});

        }


    } catch (error) {
        console.log(error);
        
    }
})

//get single table order

router.get('/getorder',async(req,res)=>{
    const {tableno} = req.query;
    
    
    try {
        const result = await Orders.findOne({tableno});

        if(result){
            res.status(200).send(result);
        }
        else{
            res.status(404).json({message:'no record found!'});
        }
    } catch (error) {
        console.log(error);
        
    }
})

//get all orders

router.get('/allorder',async(req,res)=>{
    
    
    try {
        const result = await Orders.find();

        if(result){
            res.status(200).send(result);
        }
        else{
            res.status(404).json({message:'no record found!'});
        }
    } catch (error) {
        console.log(error);
        
    }
})


//change order status

router.put('/status/:id/:index',async(req,res)=>{
    const {status}=req.body;
    const { id, index } = req.params;
    try {
        const result = await Orders.findByIdAndUpdate({_id : id},{[`items.${index}.status`]:status});

        if(result){
            res.status(200).json({msg:'data updated'})
        }
        else{
            res.status(404).json({message:'no record found!'});
        }
    } catch (error) {
        console.log(error);
        
    }
})


export default router;
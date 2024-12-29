import express from 'express';
import cors from 'cors';
import router from './Routers/TableRoute.js'
import AddFoodRoute from './Routers/AddFoodRoute.js'
import OrderRoute from './Routers/OrderRoute.js'
import 'dotenv/config';
import Dbconnect from './utils/Db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api',router);
app.use('/api',AddFoodRoute);
app.use('/api',OrderRoute);


Dbconnect().then(()=>{
    app.listen(5000,()=>{
        console.log("app running at 5000");
        
    })
})


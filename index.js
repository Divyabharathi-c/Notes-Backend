import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './db.js';
import { userRouter } from './router/userroute.js';
import { resetroute } from './router/forgotroute.js';
import { markRouter } from './router/markroute.js';
import { isAuth } from './middleware/auth.js';

dotenv.config()

const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
databaseConnection();

//routes
app.use('/',userRouter);
app.use('/fp', resetroute);
app.use('/md',isAuth, markRouter);

app.get('/',(req,res)=>{
    res.send("Hello ! User This is Success message from Markdowm Server")
})

app.listen(PORT,()=>{console.log("Server is running in port ");});

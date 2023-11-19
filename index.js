import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './db.js';
import { userRouter } from './router/userroute.js';
import { resetroute } from './router/forgotroute.js';
import { noteRouter } from './router/noterouter.js';
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
app.use('/user', resetroute);
app.use('/note',isAuth, noteRouter);

app.get('/',(req,res)=>{
    res.send("Hello ! User This is Success message from Notes taking application")
})

app.listen(PORT,()=>{console.log("Server is running in port ");});

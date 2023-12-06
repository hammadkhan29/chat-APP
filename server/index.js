import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

dotenv.config();

const app = express();

// This will enable server to send and receive json data
app.use(express.json()) ;
// Cors are use to enable cross port resource management
app.use(cors());

// Using routes
app.use('/api/users/' , userRoute);
app.use('/api/chats/' , chatRoutes);
app.use('/api/messages/' , messageRoutes);

const port  = process.env.PORT || 8000 ;

app.listen(port , (req,res)=>{
    console.log(`The server is running on port ${port}`)
});


connectDB();
import express from 'express';
import{createServer} from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv'

// loding env variablee from .env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// enabling cors so that our react can talk to the server
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// creating httpserver
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin: 'http://localhost:5173',
        methods:['GET','POST']
    }
});
// Socket connection handler
io.on('connection',(socket)=>{
    console.log(`Connected: ${socket.id}`);
    // when disconnected
    socket.on('disconnect',() =>{
        console.log(`Disconnected: ${socket.id}`);
    });
});
// server is listening
httpServer.listen(PORT,()=>{
    console.log(`running on http://localhost:${PORT}`);
});
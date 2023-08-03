import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();

const httpserver = createServer(app);
const io = new Server(httpserver,{
    cors: {
        origin: '*',
    }
});  

io.on('connection', (socket) => {
    console.log('What is socket', socket);
    console.log('Socket connected');

    socket.on('chat', (payload) => {
        console.log('What is payload', payload);
        io.emit('chat', payload);
    });
});

httpserver.listen(5500, () => {
    console.log('Listening on port 5500');
});

import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 3000});

wss.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (msg) => {
        if (msg.toString() === 'ping') {
            socket.send('pong');
        }
    })

    socket.on('error', (err) => {
        console.error('Error:', err);
    })

    socket.on('close', () => {
        console.log('Client disconnected');
    })
})
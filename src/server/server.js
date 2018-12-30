import app from "./app";
import {Server} from "http"
import socket from "socket.io";

const server = Server(app);
const io = socket(server);

io.sockets.on('connection', function (socket) {
    console.log("Un client s'est connecté !");
    socket.emit('message', 'You are connected!');

    socket.on('message', function (message) {
        console.log(message);
    }); 
});

module.exports = server;

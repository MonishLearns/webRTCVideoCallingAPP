import express from "express";

import http from "http";

import ServerConfig from "./config/serverConfig"

import { Server } from "socket.io";

import cors from "cors";
import roomHandler from "./handlers/roomHandler";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:"*",
        methods: ["GET","POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New User Connected");
    roomHandler(socket); // pass the socket conn to the room handler for room connection and joining
    socket.on("disconnect",() => {
        socket.emit("disconnected");
        console.log("User disconnected");
    })
})

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is up at port ${ServerConfig.PORT}`);
});
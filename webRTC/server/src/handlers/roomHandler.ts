import { Socket } from "socket.io";
import {v4 as UUIDv4} from "uuid";

// you can prepare one room, where you can have multiple socket connections and you can send messages to all the people in that room
const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // this will be our unique room id in which multiple connection will exchange
        socket.join(roomId);
        socket.emit("room-created",{roomId});
        console.log("room created with Id ", {roomId});
    }

    const joinRoom = () => {
        console.log("New room joined");
    }

    // When to call the above two functions

    // we will call the above two function when the client will emit events to create room and join room
    socket.on("create-room",createRoom);
    socket.on("join-room",joinRoom);
}

export default roomHandler;
import { Socket } from "socket.io";
import {v4 as UUIDv4} from "uuid";
import IRoomParams from "../interfaces/IRoomParams";

// you can prepare one room, where you can have multiple socket connections and you can send messages to all the people in that room
const rooms: Record<string,string[]> = {};
const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4(); // this will be our unique room id in which multiple connection will exchange
        socket.join(roomId);

        rooms[roomId] = []; 
        socket.emit("room-created",{roomId});
        console.log("room created with Id ", {roomId});
    }
    /**
     * 
     * The below function is executed everytime a user or create joins the room
     */
    const joinedRoom = ({roomId, peerId}: IRoomParams) => {

        if(rooms[roomId]){
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.emit("get-users",{
                roomId: roomId,
                participants: rooms[roomId]
            });
        }

        console.log("New user has joined room", roomId, peerId);
    }

    // When to call the above two functions

    // we will call the above two function when the client will emit events to create room and join room
    socket.on("create-room",createRoom);
    socket.on("join-room",joinedRoom);
}

export default roomHandler;
import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as UUIDv4} from "uuid";

const ws_Server = "http://localhost:5500";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(ws_Server,{
    withCredentials : false,
    transports: ["pooling","websocket"]}
   );

interface props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<props> = ({ children })=> {
    const navigate = useNavigate(); // help us programatically handle navigations
    const [user, setUser] = useState<Peer>();
    useEffect(() => {
       const userId = UUIDv4();
       const newPeer = new Peer(userId);

       setUser(newPeer);

       setUser(newPeer);
       const enterRoom = ({roomId} : {roomId: string}) => {
        navigate(`/room/${roomId}`);
       }
       // we will transfer the user to the room page when we collect the roomID
       socket.on("room-created",enterRoom);

       const fetchParticipants = ({roomId, participants}: {roomId:string,participants: string[]}) => {
            console.log(roomId);
            console.log(participants);
       }

       socket.on("get-users",fetchParticipants);
    },[])
    return (
        <SocketContext.Provider value={{socket, user}} >
            {children}
        </SocketContext.Provider>
    )
} 
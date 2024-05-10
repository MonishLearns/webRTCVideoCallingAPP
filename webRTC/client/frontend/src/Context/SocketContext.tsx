import SocketIoClient from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    useEffect(() => {
       const enterRoom = ({roomId} : {roomId: string}) => {
        navigate(`/room/${roomId}`);
       }
       // we will transfer the user to the room page when we collect the roomID
       socket.on("room-created",enterRoom);
    },[])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
} 
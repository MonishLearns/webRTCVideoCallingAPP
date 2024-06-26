import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as UUIDv4} from "uuid";
import { peerReducer } from "../Reducers/PeerReducer";
import { addPeerAction } from "../Actions/PeerActions";

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
    const [stream, setStream] = useState<MediaStream>();
    const [peers, dispatch ] = useReducer(peerReducer,{});
    const fetchUserFeed = async() => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true}); // browser API
        setStream(stream);
    }
    console.log(peers);
    useEffect(() => {
       const userId = UUIDv4();
       const newPeer = new Peer(userId);

       setUser(newPeer);

       fetchUserFeed();

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

    useEffect(() => {
         if(!user || !stream) return;

         socket.on("user-joined", ({peerId}) => {
            const call = user.call(peerId,stream);
            call.on("stream", () => {
                dispatch(addPeerAction(peerId, stream));
            })
         });

         user.on("call", (call) => {
            call.answer(stream);
            call.on("stream", () => {
                dispatch(addPeerAction(call.peer, stream));
            })
         })
         console.log("reached here");
         socket.emit("ready");
    },[user,stream])
    return (
        <SocketContext.Provider value={{socket, user, stream, peers }} >
            {children}
        </SocketContext.Provider>
    )
} 
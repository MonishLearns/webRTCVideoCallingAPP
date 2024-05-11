import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const Room:React.FC = () => {
    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

    useEffect(() => {
        if(user) socket.emit("join-room", {roomId: id, peerId: user._id});
    },[user,id, socket])
    return(
        <div>
            room : {id}
        </div>
    )
}

export default Room;
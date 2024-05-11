import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room:React.FC = () => {
    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);
    console.log(peers);
    useEffect(() => {
        if(user) socket.emit("join-room", {roomId: id, peerId: user._id});
    },[user,id, socket])
    return(
        <div>
            my peer:
            <UserFeedPlayer stream={stream} />
            <div>
                other peers:
                {Object.keys(peers).map((peerId) => (
                    <>
                        <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
                    </>
            ))}
            </div>
        </div>
    )
}

export default Room;
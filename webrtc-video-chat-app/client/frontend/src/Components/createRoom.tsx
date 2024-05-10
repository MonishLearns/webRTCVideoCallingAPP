import { SocketContext } from "../Context/SocketContext";
import { useContext } from "react";
const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);
    const initRoom = () => {
        socket.emit("create-room");  
    }
    return (
        <button 
        onClick={initRoom}
        className="btn btn-secondary"
        >
            Start a new meeting in a room
        </button>
    )
}

export default CreateRoom;
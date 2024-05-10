import CreateRoom from "../Components/createRoom"
import "./Home.css";

const Home: React.FC = () => {
    return(
        <div className="room">
            <CreateRoom/>
        </div>
    )
}

export default Home;
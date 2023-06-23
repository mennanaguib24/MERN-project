import { Link } from "react-router-dom";
import "./home.css"



const Home = () => {
    return ( 
        <div className="home-container">
            <h1>let's start</h1>
            <div className="home-btn">
                <div className="login-home">
                    <button><Link to="/login">Login</Link></button>
                </div>
                <div className="signup-home">
                    <button><Link to="/signup">Sign up</Link></button>
                </div>
            </div>
        </div>
    );
}


export default Home;
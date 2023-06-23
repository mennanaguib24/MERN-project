import { Link } from "react-router-dom";
import "./log.css"
import {useState} from "react"
import {ToastContainer,toast} from 'react-toastify'
import {useDispatch} from "react-redux"
import{loginUser} from "../redux/apiCalls/authApiCall"
// import { useSelector } from "react-redux"





const Login = () => {
        // const {user} = useSelector((state) => state.auth )



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("");


    const dispatch = useDispatch(); 

    const formSubmitHandler = (e) => {
        e.preventDefault();


        if (username.trim() === "" ) return toast.error("username is required");
        if (password.trim() === "" ) return toast.error("password is required");
        if (usertype.trim() === "" ) return toast.error("usertype is required");
        // console.log({username, password, usertype})
        dispatch(loginUser({username, password, usertype}))
    }


    return ( 
        <section className="form-container">
        <ToastContainer/>

            <h1 className="form-title">Login</h1>
        <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group1">
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                type="text" 
                className="form-input" 
                id="username" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group1">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                type="password" 
                className="form-input" 
                id="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group1">
                <label htmlFor="usertype" className="form-label">Usertype</label>
                <select 
                className="form-input" 
                required
                value={usertype}
                onChange={(e) => setUsertype(e.target.value)}>
                    <option>None</option>
                    <option>student</option>
                    <option>teacher</option>
                    
                </select>
            </div>
            <button className="form-btn" >Login</button>
        </form>
        <div className="form-footer">
            You don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        </section>
    );
}


export default Login;
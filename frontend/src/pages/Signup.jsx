import { Link, useNavigate } from "react-router-dom";
import "./log.css"
import {useState} from "react"
import {ToastContainer,toast} from 'react-toastify'
import {useDispatch, useSelector} from "react-redux"
import{signupUser} from "../redux/apiCalls/authApiCall"
import swal from 'sweetalert'



const Signup = () => {
    const dispatch = useDispatch(); 
    const {registerMessage} = useSelector(state => state.auth);


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("");




    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();


        if (username.trim() === "" ) return toast.error("username is required");
        if (password.trim() === "" ) return toast.error("password is required");
        if (usertype.trim() === "" ) return toast.error("usertype is required");
        dispatch(signupUser({username, password, usertype}))

    }

    const navigate = useNavigate()

    if (registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if(isOk) {
                // go to login page
                navigate("/login");
            }
        })
    }


    return ( 
        <section className="form-container">
        <ToastContainer/>

            <h1 className="form-title">Create new account</h1>
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
                    <option>admin</option>
                    <option>super_admin</option>
                    
                </select>
            </div>
            <button className="form-btn">Sign up</button>
        </form>

        <div className="form-footer">
            Already have account? <Link to="/Login">Login</Link>
        </div>

        </section>
    );
}


export default Signup;
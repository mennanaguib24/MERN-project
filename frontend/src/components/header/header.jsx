import { useSelector, useDispatch } from "react-redux"
import "./header.css"
import {Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";





const Header = () => {
    const dispatch = useDispatch();
    
    const {user} = useSelector((state) => state.auth )
    return ( 

        
        <div>
        <header className="header">
        <div className="header-leftt">
            <div className="header-left-link"><span>Exam WebSite</span></div>
        </div>



        

        {user ? (
        <>
        <div className="header-right-user-info">
            <span className="header-right-username">
                {user?.data.username}
            </span>

            
            <Link className="profile-btn"
            to={`/profile/${user?.data._id}`}
            >            
            <i className="bi bi-file-person"></i>
                <span>profile</span>
            </Link>
            <Link to={"/"}>
            <div onClick={()=> dispatch(logoutUser())}>
                <span>logout</span>
            </div>
            </Link>
        </div>
        </> 
        ) : (
        <>
        <div className="header-right">
            {/* <div className="header-right-link"><span>Login</span></div> */}
            {/* <div className="header-right-link"><span>SignUp</span></div> */}
        </div>
        </>
        )}
        
        </header>
        </div>


    );
    

}


export default Header ;
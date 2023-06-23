import { useEffect, useState } from "react";
import "./profile"
import "./profile.css"
import { ToastContainer,toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { getUserProfile } from "../redux/apiCalls/profileApiCall";
import { useParams } from "react-router-dom";
import {Link } from "react-router-dom";




const Profile = () => {

    const dispatch = useDispatch();
    // const { profile } = useSelector(state => state.profile)
    const {user} = useSelector((state) => state.auth )



    const [file, setFile] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getUserProfile(id))
        
        
    }); 



    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("ther is no file ");
        console.log("img uploaded")
    }

    return ( 
        <section className="profile">
        <ToastContainer/>
        <h1>Welcome to your profile page</h1>

            <div className="profile-header">
                <div className="profile-img">
                    <img src= {file ? URL.createObjectURL(file): "/images/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"}
                    alt="" 
                    className="profileImg"
                    />
                    <form onSubmit={formSubmitHandler}>
                        <abbr title="choose profile photo">
                        <label htmlFor="file" 
                            className="bi bi-camera-fill upload-profile-photo-icon"></label>
                        </abbr>
                        <input style={{display: 'none'}} 
                        type="file" 
                        name="file" 
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}></input>
                        <button className="upload-profile-photo-btn" type="submit">
                            upload
                        </button>
                    </form> 
                </div>
                <h1 className="profile-username">Your UserName:{user.data.username}</h1>
                <h1 className="profile-username">Your UserType: {user.data.usertype}</h1>



                {user.data.usertype === "teacher" ? 
            <button className="create-question"><Link to={"/createquestion"}>Create question</Link></button> : console.log("no")}
            {user.data.usertype === "teacher" ? 
            <button className="create-question"><Link to={"/questions/page"}> View questions</Link></button> : console.log("no")}
                {/* {profile.usertype === "teacher" (
                    <>
                    <button>create</button>
                    </>)} */}
                    {/* {console.log(profile)} */}
                <div className="user-data-joined">
                    {/* <strong>Data Joined:</strong> */}
                    <br></br>
                    {/* <span>{profile.createdAt}</span> */}
                </div>
                
            </div>
        </section>
        
    );
}


export default Profile;
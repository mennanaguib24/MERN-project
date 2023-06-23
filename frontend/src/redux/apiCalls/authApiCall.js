/* eslint-disable no-unused-vars */
import { authActions } from "../slices/authSlice"
import { request } from "../../utils/request"
import {toast} from "react-toastify"

// login user
export function loginUser(user) {
    return async (dispatch) => {
        try{
            const {data} = await request.post("/api/auth/login", user)
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo", JSON.stringify(data));            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


// signup user
export function signupUser(user) {
    return async (dispatch) => {
        try{
            const {data} = await request.post("/api/auth/signup", user)
            dispatch(authActions.signup(data.message));            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}





// logout user
export function logoutUser() {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}


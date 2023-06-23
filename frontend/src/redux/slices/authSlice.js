import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ? 
        JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
    },
    reducers:{
        login(state,action){
            state.user = action.payload;
        },
        signup(state,action){
            state.registerMessage = action.payload;
        },
        logout(state) {
            state.user = null;
        },
    }
});


const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export{ authActions, authReducer }



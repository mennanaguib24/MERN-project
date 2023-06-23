import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { questionReducer } from "./slices/questionSlice";
import { answerReducer } from "./slices/answerSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        question: questionReducer,
        answer: answerReducer,
    }
})


export default store;
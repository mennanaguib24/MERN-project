import {createSlice} from "@reduxjs/toolkit";

const answerSlice = createSlice({
    
    name: "answer",
    initialState: {
        
    },
    reducers:{
        

    }
});


const answerReducer = answerSlice.reducer;
const answerActions = answerSlice.actions;

export{ answerActions, answerReducer }


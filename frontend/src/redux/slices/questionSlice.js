import {createSlice} from "@reduxjs/toolkit";

const questionSlice = createSlice({
    
    name: "question",
    initialState: {
        questions: [],
        questionsCount: null,
        loading: false,
        isQuestionCreated: false,
        question: null,

    },
    reducers:{
        setQuestions(state, action) {
            state.questions = action.payload
        },
        // setQuestionsCount(state, action) {
        //     state.questionsCount = action.payload;
        // },
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = true;
        },
        setIsQuestionCreated(state){
            state.isQuestionCreated = true;
            state.loading = false;
        },
        clearIsQuestionCreated(state){
            state.isQuestionCreated = false;
            // state.loading = false;
        },
        setQuestion(state, action){
            state.question = action.payload;
        },
        addAnswerToQuestion(state, action){
            state.question.answers.push(action.payload)
        },
        updateAnswerForQuestion(state, action){
            state.question.answers = state.question.answers.map(answer => 
                answer._id === action.payload._id ? action.payload : answer)
        },
        deleteAnswerForQuestion(state, action){
            const answer = state.question.answers.find(c => c._id === action.payload);
            const answerIndex = state.question.answers.indexOf(answer);

            state.question.answers.splice(answerIndex, 1);
        }


    }
});


const questionReducer = questionSlice.reducer;
const questionActions = questionSlice.actions;

export{ questionActions, questionReducer };



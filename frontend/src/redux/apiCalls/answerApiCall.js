import { questionActions } from "../slices/questionSlice"
import { request } from "../../utils/request"
import {toast} from "react-toastify"




// update answer
export function updateAnswer(answerId ,answer) {
    return async (dispatch,getState) => {
        try{
            const {data} = await request.patch(`/api/questions/answers/${answerId}`,answer,
            {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            }) ;
            
            dispatch(questionActions.updateAnswerForQuestion(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}












// // create answer
// export function createAnswer(newAnswer) {
//     return async (dispatch,getState) => {
//         try{
//             const {data} = await request.get(`/api/answer` ,newAnswer
//             ,
//             {
//                 headers: {
//                     Authorization: "Bearer " + getState().auth.user.token,
//                 }
//             }
//             )
//             dispatch(questionActions.addAnswerToQuestion(data));
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }
// }



// // // get questions count
// // export function getQuestionsCount(pageNumber) {
// //     return async (dispatch,getState) => {
// //         try{
// //             const {data} = await request.get(`/api/questions/count}`
// //             ,
// //             {
// //                 headers: {
// //                     Authorization: "Bearer " + getState().auth.user.token,
// //                 }
// //             }
// //             )
// //             dispatch(questionActions.setQuestionsCount(data));
// //         } catch (error) {
// //             toast.error(error.response.data.message);
// //         }
// //     }
// // }






// // // create question
// // export function createQuestion(newQuestion) {
// //     return async (dispatch,getState) => {
// //         try{
// //             dispatch(questionActions.setLoading());
// //             await request.post(`/api/questions`,newQuestion,
            
// //             {
// //                 headers: {
// //                     Authorization: "Bearer " + getState().auth.user.token,
// //                 }
// //             }
// //             )
// //             dispatch(questionActions.setIsQuestionCreated());
// //             setTimeout(()=> dispatch(questionActions.clearIsQuestionCreated()),2000)
// //         } catch (error) {
// //             toast.error(error.response.data.message);
// //             dispatch(questionActions.clearLoading());
// //         }
// //     }
// // }



// // // fetch single question
// // export function fetchSingleQuestion(questionId) {
// //     return async (dispatch,getState) => {
// //         try{
// //             const {data} = await request.get(`/api/questions/page/${questionId}`,
// //             {
// //                 headers: {
// //                     Authorization: "Bearer " + getState().auth.user.token,
// //                 }
// //             }
// //             );
            
// //             dispatch(questionActions.setQuestion(data));
// //         } catch (error) {
// //             toast.error(error.response.data.message);
// //         }
// //     }
// // }




// // // update question
// // export function updateQuestion(newQuestion ,questionId) {
// //     return async (dispatch,getState) => {
// //         try{
// //             const {data} = await request.put(`/api/questions/page/${questionId}`,newQuestion,
// //             {
// //                 headers: {
// //                     Authorization: "Bearer " + getState().auth.user.token,
// //                 }
// //             }) ;
            
// //             dispatch(questionActions.setQuestion(data));
// //         } catch (error) {
// //             toast.error(error.response.data.message);
// //         }
// //     }
// // }

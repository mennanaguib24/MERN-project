// import { useState } from "react";
// import {ToastContainer,toast} from 'react-toastify';
// import {addAnswer} from "../redux/apiCalls/answerApiCall";
// import {useDispatch} from "react-redux";
// import AnswersList from "./answersList";
// import { createAnswer } from "../redux/apiCalls/answerApiCall";


// export const Answer = () => {

//     const [answerValue, setAnswerValue] = useState ("");
//     const dispatch = useDispatch ();

//         const formSubmitHandler = (e) => {
//         e.preventDefault();
//         // let answerObj= {
//         //     id: '',
//         //     answer: answerValue,
//         //     completed: false
//         // }
        

//         if (answerValue.trim() === "" ) return toast.error("answer is required");
//             console.log({answerValue})
//             dispatch(createAnswer({answerValue }))
//             setAnswerValue("")

//         }
//     return (

//         <div >
//                 <ToastContainer/>

//             <form onSubmit={formSubmitHandler}>
//                 <input type="text" 
//                 placeholder="add answer"
//                 value={answerValue}
//                 onChange={(e) => setAnswerValue(e.target.value)}
//                 ></input>
//                 <button >add</button>
//             </form>

//             <AnswersList/>
//         </div>
        
//     )
// }

// // export default Answer
import { useState } from "react"
import "./update-question-model.css"
import {ToastContainer,toast} from 'react-toastify'
import {useDispatch} from "react-redux"
import { updateAnswer } from "../redux/apiCalls/answerApiCall"


export const UpdateAnswerModel = ({setUpdateAnswer, answerForUpdate}) => {

    const dispatch = useDispatch();


    const [answerValue, setAnswerValue] = useState(answerForUpdate?.answerValue);
    console.log(answerForUpdate)


    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (answerValue === "" ) return toast.error("required");

        dispatch(updateAnswer(answerForUpdate?._id, {answerValue}));
        setUpdateAnswer(false);
        // console.log(question)
    }
    
    return (
        <div className="update-answer">
        <ToastContainer/>
            <form onSubmit={formSubmitHandler} className="update-question-form">
                <abbr title="close">
                    <i 
                    onClick={()=> setUpdateAnswer(false)} 
                    className="bi bi-x-circle-fill update-answer-form-close">
                    </i>
                </abbr>
                <h1>Update this answer</h1>
                <label>The question</label>
                    <input 
                        type="text" 
                        name="question"
                        id="question"
                        placeholder=""
                        value={answerValue}
                        onChange={(e)=> setAnswerValue(e.target.value)}
                    />
                
                    <div className="field">
                    <button type="submit">Update</button>
                    </div>
            </form>

        </div>
    )
}
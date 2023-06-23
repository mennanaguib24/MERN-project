import { useState } from "react"
import "./update-question-model.css"
import {ToastContainer,toast} from 'react-toastify'
import {useDispatch} from "react-redux"
import { updateQuestion } from "../redux/apiCalls/questionApiCall"


export const UpdateQuestionModel = ({setUpdateQuestion, question}) => {

    const dispatch = useDispatch();

    const [name, setName] = useState(question.name);
    const [category, setCategory] = useState(question.category);
    const [subcategory, setSubcategory] = useState(question.subcategory);
    const [expectedTime, setExpectedTime] = useState(question.expectedTime);
    const [mark, setMark] = useState(question.mark);


    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (name === "" ) return toast.error("Question is required");
        if (category === "" ) return toast.error("category is required");
        if (subcategory === "" ) return toast.error("subcategory is required");
        if (expectedTime === "" ) return toast.error("time is required");
        if (mark === "" ) return toast.error("degree is required");

        dispatch(updateQuestion({name, category, subcategory, expectedTime, mark}, question?._id))
        setUpdateQuestion(false)
        // console.log({name, category, subcategory, expectedTime, mark})
    }
    
    return (
        <div className="update-question">
        <ToastContainer/>
            <form onSubmit={formSubmitHandler} className="update-question-form">
                <abbr title="close">
                    <i 
                    onClick={()=> setUpdateQuestion(false)} 
                    className="bi bi-x-circle-fill update-question-form-close">
                    </i>
                </abbr>
                <h1>Update this question</h1>
                <label>The question</label>
                    <input 
                        type="text" 
                        name="question"
                        id="question"
                        placeholder=""
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                <label>category</label>
                    <input 
                        type="text" 
                        name="category"
                        id="category"
                        placeholder=""
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                    />
                <label>subcategory</label>
                    <input 
                        type="text" 
                        name="subcategory"
                        id="subcategory"
                        placeholder=""
                        value={subcategory}
                        onChange={(e)=> setSubcategory(e.target.value)}
                    />
                <label>Expected Time</label>
                    <input 
                        type="text" 
                        name="expectedTime"
                        id="expectedTime"
                        placeholder=""
                        value={expectedTime}
                        onChange={(e)=> setExpectedTime(e.target.value)}
                    />
                <label>Question degree</label>
                    <input 
                        type="number" 
                        name="mark"
                        id="mark"
                        placeholder=""
                        value={mark}
                        onChange={(e)=> setMark(e.target.value)}
                    />
                    <div className="field">
                    <button type="submit">Update</button>
                    </div>
            </form>

        </div>
    )
}
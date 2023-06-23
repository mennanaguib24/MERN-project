import { useState, useEffect } from "react";
import {ToastContainer,toast} from 'react-toastify'
// import { Answer } from "./answer";
import "./createQuestion.css"
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { createQuestion } from "../redux/apiCalls/questionApiCall";
// import { Answertest } from "./tst";
// import {Link } from "react-router-dom";
// import { Answertest } from "./tst";




const Question = () => {



    const [name, setName] = useState ("");
    const [category, setCategory] = useState ("");
    const [subcategory, setSubcategory] = useState ("");
    const [expectedTime, setExpectedTime] = useState ("");
    const [mark, setMark] = useState ("");

    const [answerValue, setAnswerValue] = useState ("");
    const [answers, setAnswers] = useState ("");
    // const [owner, setOwner] = useState ("");

    const [correctAnswerValue, setCorrectAnswerValue] = useState ("");
    const [correctAnswer, setCorrectAnswer] = useState ("");


    const dispatch = useDispatch();
    const {loading, isQuestionCreated} = useSelector(state => state.question);



    const handleSubmit = (e) => {
        e.preventDefault();
        
        let answerObject = {
            
            answerValue: answerValue,
        }
        // updating answer state 
        setAnswers([...answers,answerObject])
        // clearing input field
        setAnswerValue('');
    }


    const handleSubmitCorrect = (e) => {
        e.preventDefault();
        
        let correctAnswerObject = {
            
            correctAnswerValue: correctAnswerValue,
        }
        // updating answer state 
        setCorrectAnswer([...correctAnswer,correctAnswerObject])
        // clearing input field
        setCorrectAnswerValue('');
    }



    // form submit handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        if (name.trim() === "" ) return toast.error("Question is required");
        if (category.trim() === "" ) return toast.error("category is required");
        if (subcategory.trim() === "" ) return toast.error("subcategory is required");
        if (expectedTime.trim() === "" ) return toast.error("time is required");
        if (mark === "" ) return toast.error("degree is required");
        if (answers === "" ) return toast.error("answers is required");
        // if (answer.trim() === "" ) return toast.error("degree is required");
        // if (owner.trim() === "" ) return toast.error("owner is required");

        console.log({name,category,subcategory,expectedTime,mark,answers,correctAnswer})




        // send form data to server
        dispatch(createQuestion({name,category,subcategory,expectedTime,mark,answers,correctAnswer}));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if(isQuestionCreated){
            navigate("/questions/page");
        }
    })

    useEffect(()=> {
        localStorage.setItem('Answer', JSON.stringify(answers))
    }, [answers]) 

    


    return (
        <div className="form-container">
        <ToastContainer/>
            <form onSubmit={formSubmitHandler}>
                <h1>create new question</h1>
                <div className="field">
                    <label>The question</label>
                    <input 
                        type="text" 
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>category</label>
                    <input 
                        type="text" 
                        placeholder=""
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}    
                        />
                </div>
                <div className="field">
                    <label>Subcategory</label>
                    <input 
                    type="text" 
                    placeholder=""
                    name="subcategory"
                    id="subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}    
                    
                    />
                </div>
                <div className="field">
                    <label>Expected Time</label>
                    <input 
                        type="text" placeholder=""
                        name="expectedTime"
                        id="expectedTime"
                        value={expectedTime}
                        onChange={(e) => setExpectedTime(e.target.value)} 
                    />
                </div>
                <div className="field"> 
                    <label>Question degree</label>
                    <input 
                    type="number" 
                    placeholder=""
                    name="mark"
                    id="mark"
                    value={mark}
                    onChange={(e) => setMark(e.target.value)} 
                    />
                </div>


                <div className="field">
                <div>Add Answers</div>
                        <input type="text"
                            onChange={(e)=>setAnswerValue(e.target.value)} 
                            value={answerValue}
                        />
                        <div>
                        <button onClick={handleSubmit} type="submit">add</button>



                        </div>
                    {/* start of rendering answers if answer.length > 0 */}
                    {answers.length >0 &&(
                        <>
                            {answers.map((individualanswer,index)=>(
                                <div className="answer" 
                                key={individualanswer.ID}>
                                    
                                        <input className="answers-input" type="radio"/>
                                        {individualanswer.answerValue}
                                    
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className="field">
                <div>Correct Answer</div>
                        <input type="text"
                            onChange={(e)=>setCorrectAnswerValue(e.target.value)} 
                            value={correctAnswerValue}
                        />
                        <div>
                        <button onClick={handleSubmitCorrect} type="submit">add</button>



                        </div>
                    {/* start of rendering answers if answer.length > 0 */}
                    {correctAnswer.length >0 &&(
                        <>
                            {correctAnswer.map((individualanswer,index)=>(
                                <div className="answer" 
                                key={individualanswer.ID}>
                                    
                                        <input className="answers-input" type="radio"/>
                                        {individualanswer.correctAnswerValue}
                                    
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div>
                    {/* <Answertest/> */}
                </div>
                
                <div className="field">
                    <button type="submit">
                    {
                        loading ? "Loading..." : "Create"
                    }
                    </button>
                </div>
                
            </form>
            {/* <div className="field-answer">
            <button type="submit"> <Link to="/answer">Add Answers</Link></button>

            </div> */}

            {/* <div className="answers-form field">
                <Answertest/>
                </div> */}
            
        </div>
    );
}


export default Question;
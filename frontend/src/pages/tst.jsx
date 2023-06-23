import { useEffect, useState } from "react";
// import {ToastContainer,toast} from 'react-toastify'
import "./createQuestion.css"


// get answer from local storage

// const getAnswerFromLS = () => {
//     const data = localStorage.getItem('Answer')
//     if (data) {
//         return JSON.parse(data)
//     }else {
//         return []
//     }

// }


export const Answertest = () => {

    // answer value state
    const [answerValue, setAnswerValue] = useState ("");

    // answer array of objects
    const [answer, setAnswer] = useState ("");
    console.log(answer)


    const handleSubmit = (e) => {
        e.preventDefault();
        



        // creating id for every answer
        // const date = new Date();
        // const time = date.getTime();

        // creating id for every answer
        let answerObject = {
            // ID: time,
            AnswerValue: answerValue,
            // completed: false
        }

        // updating answer state 
        setAnswer([...answer,answerObject])

        // clearing input field
        setAnswerValue('');

        
    }        
    // saving data to local storage

    useEffect(()=> {
        localStorage.setItem('Answer', JSON.stringify(answer))
    }, [answer]) 

    


    return (
        <>
        <div>
            <form>
                <div>Add Answers</div>
                        <input type="text"
                            onChange={(e)=>setAnswerValue(e.target.value)} 
                            value={answerValue}
                        />
                        <div>
                        <button onClick={handleSubmit} type="submit">add</button>

                        </div>
                    </form>
                    {/* start of rendering answers if answer.length > 0 */}
                    {answer.length >0 &&(
                        <>
                            {answer.map((individualanswer,index)=>(
                                <div className="answer" 
                                key={individualanswer.ID}>
                                    
                                        <input className="answers-input" type="radio"/>
                                        {individualanswer.AnswerValue}
                                    
                                </div>
                            ))}
                        </>
                    )}
                </div>
                
        </>
    )
}

// export default Answer;
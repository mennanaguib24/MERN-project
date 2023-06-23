
import "./questionItem.css"
import { Link } from "react-router-dom";


export const QuestionItem = ({questions}) => {
    return (
        <div className="question-container">
            <div><h1>{questions.name} ??</h1></div>
            <div><p>category: {questions.category}</p></div>
            <div><p>subcategory: {questions.subcategory}</p></div>
            <div><p>this question from {questions.mark} points</p></div>
            <div><p>created by {questions.createdBy}</p></div>
            <div><small>created at: {questions.createdAt}</small></div>
            <button><Link to={`/questions/details/${questions._id}`}>open</Link></button>
            <br/>
            <br/>
        </div>
        
    )
}
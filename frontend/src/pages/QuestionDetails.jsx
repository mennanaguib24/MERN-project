
import {useParams} from "react-router-dom";
// import { Link} from "react-router-dom";
import AnswersList from "./answersList";
import "./questiondetails.css"
import swal from "sweetalert";
import { UpdateQuestionModel } from "./UpdateQuestionModel";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleQuestion } from "../redux/apiCalls/questionApiCall";
import 'bootstrap-icons/font/bootstrap-icons.css';







const QuestionDetails = () => {
    const dispatch = useDispatch();
    const {question} = useSelector(state => state.question);
    const {user} = useSelector(state => state.auth);

    const {id} = useParams();

    const [UpdateQuestion, setUpdateQuestion] = useState(false)

    useEffect(()=>{
        dispatch(fetchSingleQuestion(id))
    },[id])



    // delete question handler
    const deleteQuestionHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
                .then((willDelete) => {
                if (willDelete) {
                swal("Question has been deleted!", {
                icon: "success",
                });
                } else {
                swal("something went wrong");
                }
            });
    }



    return (
        <div className="question-details">
            <div className="ques-box">
            <div className="ques-name"><h1>The question: {question?.name}?</h1></div>
                {user?.data.username === question?.createdBy && (
                    <div>
                    <i onClick={()=> setUpdateQuestion(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deleteQuestionHandler} className="bi bi-trash-fill"></i>
                </div>
                )}
            </div>
            <div><AnswersList answers={question?.answers}/></div>
            {UpdateQuestion && <UpdateQuestionModel question={question} setUpdateQuestion={setUpdateQuestion}/>}
            <small>This question created by :{question?.createdBy}</small>
        </div>

    )
}


export default QuestionDetails;
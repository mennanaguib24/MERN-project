import "./questiondetails.css"
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UpdateAnswerModel } from "./updateAnswerModel";




const AnswersList = ({answers}) => {

    const [UpdateAnswer, setUpdateAnswer] = useState(false)

    const[answerForUpdate, setAnswerForUpdate] = useState(false)

    // Update answer handler
    const updateAnswerHandler = (answer) => {
        setAnswerForUpdate(answer);
        setUpdateAnswer(true)
    }

    const {question} = useSelector(state => state.question);
    const {user} = useSelector(state => state.auth);


        // delete question handler
        const deleteAnswerHandler = () => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                    .then((willDelete) => {
                    if (willDelete) {
                    swal("Answer has been deleted!", {
                    icon: "success",
                    });
                    } else {
                    swal("something went wrong");
                    }
                });
        }

    return(
        <div className="answers-list">
        <h3>The Answers:</h3>
        {answers?.map(answer => (
            <div key={answer._id} className="answer-box">
                
                <p>{answer.answerValue}</p>
                <div>

                {user?.data.username === question?.createdBy && (
                    <div>
                    <i onClick={() => updateAnswerHandler(answer)} className="bi bi-pencil-square"></i>
                    <i onClick={deleteAnswerHandler} className="bi bi-trash-fill"></i>
                </div>
                )}
                </div>
                
            </div>
        ))}
        {UpdateAnswer && <UpdateAnswerModel 
        answerForUpdate={answerForUpdate} 
        setUpdateAnswer={setUpdateAnswer}/>}
            
        </div>
    );
}


export default AnswersList;
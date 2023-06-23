import { useEffect, useState} from "react";
import { fetchquestions,getQuestionsCount } from "../redux/apiCalls/questionApiCall";
// import state from "sweetalert/typings/modules/state";
// import QuestionDetails from "./QuestionDetails"
import { Pagination } from "../components/Pagination/Pajination";
// import {questions} from "../data/dummyData";
import {QuestionsList} from "./QuestionsList"

import { useDispatch, useSelector } from "react-redux";
import "./questionItem.css"
import axios from 'axios';





// const POST_PRE_PAGE = 3;

export const QuestionsPage = () => {
    // const dispatch = useDispatch();
    // const { questions} = useSelector(state => state.question);
    // const pages = Math.ceil(questionsCount / POST_PRE_PAGE)

    // const [currentPage, setCurrentpage] = useState(1)
    const [questions, setQuestions] = useState(null)
    

    useEffect(() => {
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:8000/api/questions/page',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYyZWFkMDdhZDRmOWU2MGNlODRkOTIiLCJ1c2VybmFtZSI6Im1lbm5hIiwidXNlcnR5cGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNjg0NTk0NDgxLCJleHAiOjE2ODk3Nzg0ODF9.9aycAIwjoT5Bce66KmAXVfuZx_if_N4DNWHr3p2vsn0'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log("test");
  setQuestions(response.data)
})
.catch((error) => {
  console.log(error);
});

    
    },[] )
    // useEffect(() => {
    //     dispatch(getQuestionsCount())
    // })

    return (
        <div className="questions-page"> <p className="p">questions page</p>
            
            {questions && <QuestionsList questions={questions}/>}
            {/* <Pagination pages={pages} currentPage={currentPage}
                setCurrentpage={setCurrentpage}
            /> */}
    
        </div>
    )
}


// export default questionsPage;
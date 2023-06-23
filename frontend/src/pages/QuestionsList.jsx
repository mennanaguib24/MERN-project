import { QuestionItem } from "./QuestionItem"

export const QuestionsList = ({questions}) => {
    return (
        <div>
            {questions.map(item => <QuestionItem questions={item} key={item._id}/>)}
        </div>
        
    )
}


// export default QuestionsList
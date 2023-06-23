import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import Question from "./pages/createQuestion";
import { Answer } from "./pages/answer";
import { QuestionsPage } from "./pages/questionsPage";
import QuestionDetails from "./pages/QuestionDetails";
import { useSelector } from "react-redux"




function App() {
  const {user} = useSelector(state => state.auth);
  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/profile"/>}/>
        <Route path="/signup" element={!user ?<Signup/> : <Navigate to="/profile"/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/createquestion" element={<Question/>}/>
        <Route path="/questions/details/:id" element={<QuestionDetails/>}/>
        {/* <Route path="/questions/page/:id" element={<QuestionDetails/>}/> */}
        <Route path="/answer" element={<Answer/>}/>
        <Route path="/questions/page" element={<QuestionsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

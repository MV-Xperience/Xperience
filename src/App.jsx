import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fbApp from "./tools/Firebase";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout.jsx";
import SubmitReview from "./pages/submitReview/SubmitReview";
import ViewQuestion from "./pages/viewQuestion/ViewQuestion";
import NewQuestion from "./pages/newQuestion/NewQuestion";
import QuestionForum from "./pages/viewAllQuestions/QuestionForum";
import Class from "./pages/class/Class.jsx";
import Browse from "./pages/browseReviews/Browse";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import "./app.css";

const App = () => {
    const auth = getAuth(fbApp);

    onAuthStateChanged(auth, (userIn) => {
        
    });

    return (
        <div className='App'>
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='question'>
                        {/* <QuestionList user={user} /> */}
                        <Route path=':id' element={<ViewQuestion />} />
                        {/* <ReplyList /> */}
                        <Route path='new' element={<NewQuestion />} />
                    </Route>
                    <Route path='browse-questions' element = {<QuestionForum />}>
                        <Route path=':id'>
                            <Route element = {<QuestionForum />} />
                        </Route>
                    </Route>
                    <Route path='review' element={<SubmitReview />} />
                    <Route path='class'>
                        <Route path=':id'>
                            <Route index element = {<Class />} />
                        </Route>
                    </Route>
                    <Route path='browse-reviews' element = {<Browse />} />                    
                    <Route path='about' element = {<About />}/>
                    <Route path='logout' element={<Logout />} />
                    <Route path='login' element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fbApp from "./tools/Firebase";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout.jsx";
import SubmitReview from "./pages/submitReview/SubmitReview";
import NewQuestion from "./pages/newQuestion/NewQuestion";
import Class from "./pages/class/Class.jsx";

import "./app.css";

const App = () => {
    const auth = getAuth(fbApp);
    const [user, setUser] = useState(auth.currentUser);

    onAuthStateChanged(auth, (userIn) => {
        setUser(userIn);
    });

    console.log(user); // remove this line later

    return (
        <div className='App'>
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='home'></Route>
                    <Route path='question'>
                        {/* <QuestionList user={user} /> */}
                        <Route path=':id' />{/* <ReplyList /> */}
                        <Route path='new' element={<NewQuestion />} />
                    </Route>
                    <Route path='review' element = {<SubmitReview />} />
                    <Route path='class'>
                        <Route path = ':id' element = {<Class />}/>
                    </Route>
                    <Route path='about' />
                    <Route path='logout' element={<Logout />} />
                    <Route path='login' element={<Login />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

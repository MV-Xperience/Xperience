import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fbApp from "./tools/Firebase";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout.jsx";
import SubmitReview from "./pages/submitReview/SubmitReview";

import "./app.css";

const App = () => {
    const auth = getAuth(fbApp);
    const [user, setUser] = useState(auth.currentUser);
    onAuthStateChanged(auth, (userIn) => {
        setUser(userIn);
    });
    console.log(user);

    return (
        <div className='App'>
            {/* <Navbar user={user} /> */}
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/home'></Route>
                    <Route path='/questions'>{/* <QuestionList user={user} /> */}</Route>
                    <Route path='/questions/:id'>{/* <ReplyList /> */}</Route>
                    <Route path='/review'>{/* <ReviewFinder /> */}</Route>
                    <Route exact path='/submitReview' element={<SubmitReview />} />
                    <Route path='/About'></Route>
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import fbApp from "./tools/Firebase";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/auth/Logout.jsx";


import "./app.css";

function App() {
    const auth = getAuth(fbApp);
    const [user, setUser] = useState(auth.currentUser);
    onAuthStateChanged(auth, (userIn) => {
        setUser(userIn);
    });
    console.log(user);

    return (
        <Router>
            <div className='App'>
                {/* <Navbar user={user} /> */}
                <div className='content'>
                    <Routes>
                        {/* New Syntax for React Router 6 */}
                        {/* Index means just / */}
                        <Route index element={<Dashboard />}></Route>
                        <Route path='/home'></Route>
                        <Route path='/questionForum'>{/* <QuestionList user={user} /> */}</Route>
                        <Route path='/questionForum/:id'>{/* <ReplyList /> */}</Route>
                        <Route path='/reviewfinder'>{/* <ReviewFinder /> */}</Route>
                        <Route path='/reviewSubmitter'>{/* <SubmitReview /> */}</Route>
                        <Route path='/About'></Route>
                        <Route path='/logout' element={<Logout />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

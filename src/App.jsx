import Logout from "./pages/auth/logout.jsx";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import fbApp from "./tools/Firebase";
import Login from "./pages/auth/login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
                        <Route path='/dashboard'>{/* <Dashboard user={user}></Dashboard> */}</Route>
                        {/* New Syntax for React Router 6 */}
                        {/* Index means just / */}
                        <Route index element={<Dashboard></Dashboard>}></Route>
                        <Route path='/home'>
                            {" "}
                            {/*Route for home page*/}
                            {/* <Home user={user} /> */}
                        </Route>
                        <Route path='/questionForum'>{/* <QuestionList user={user} /> */}</Route>
                        <Route path='/questionForum/:id'>{/* <ReplyList /> */}</Route>
                        <Route path='/reviewfinder'>{/* <ReviewFinder /> */}</Route>
                        <Route path='/reviewSubmitter'>{/* <SubmitReview /> */}</Route>
                        <Route path='/About'></Route>
                        <Route path='/logout' element={<Logout></Logout>}></Route>
                        <Route path='/login' element={<Login></Login>}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

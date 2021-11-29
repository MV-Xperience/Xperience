// import Navbar from "./pages/Navbar.js";
// import Default from "./pages/default/default.jsx";
// import Home from "./pages/home/home.jsx";
// import QuestionList from "./pages/questions/questionList.jsx";
// import ReviewFinder from "./pages/reviewfinder/reviewfinder.jsx";
// import SubmitReview from "./pages/reviewSubmitter/submitReview.jsx";
// import ReplyList from "./pages/questions/replyFourm";
import Logout from "./pages/auth/logout.jsx";
// import Dashboard from "./pages/dashboard/dashboard.js";

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import fbApp from "./fb.js";
import Login from "./pages/auth/login.jsx";

import { getAuth, onAuthStateChanged } from "firebase/auth"
// see this is my home page and it goes to....

function App() {
  const auth = getAuth(fbApp);
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (userIn) => {
    setUser(userIn);
  });
  console.log(user);

  return (
    <Router>
      <div className="App">
        {/* <Navbar user={user} /> */}
        <div className="content">
          <Routes>
            <Route exact path="/dashboard">
              {/* <Dashboard user={user}></Dashboard> */}
            </Route>
            <Route exact path="/">
              {" "}
              {/*Need firebase auth here and other homescreen*/}
              {/* <Default /> */}
            </Route>
            <Route exact path="/home">
              {" "}
              {/*Route for home page*/}
              {/* <Home user={user} /> */}
            </Route>
            <Route exact path="/questionForum">
              {/* <QuestionList user={user} /> */}
            </Route>
            <Route exact path="/questionForum/:id">
              {/* <ReplyList /> */}
            </Route>
            <Route exact path="/reviewfinder">
              {/* <ReviewFinder /> */}
            </Route>
            <Route exact path="/reviewSubmitter">
              {/* <SubmitReview /> */}
            </Route>
            <Route exact path="/About"></Route>
            <Route exact path="/logout" element={<Logout></Logout>}>
            </Route>
            <Route exact path="/login" element={<Login></Login>}>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

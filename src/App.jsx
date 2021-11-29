
import Logout from "./pages/auth/logout.jsx";

import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import fbApp from "./tools/Firebase";
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

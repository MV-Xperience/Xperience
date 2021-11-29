import React from "react";

// IMPORT THIS WHENEVER YOU NEED AUTHENTICATION
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

var provider = new GoogleAuthProvider();

const FirebaseContainer = (params) => {
  function signIn() {
    const auth = getAuth()
    signInWithPopup(auth, provider)
  }
  return (
    <div>
      <button onClick={signIn} className="boxShadow" style={{ width: "auto", height: 5 + "rem", padding: 1 + "rem", display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 1 + "rem", border: "none" }}>
        <img src="googleLogo.png" alt="google" style={{ width: "auto", height: 100 + "%" }}></img>
        <span style={{ lineHeight: 5 + "rem", fontSize: 1.5 + "rem", paddingLeft: 0.5 + "rem" }}>Sign In with Google</span>
      </button>
    </div>
  );
};
export default FirebaseContainer;

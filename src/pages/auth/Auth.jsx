import React, {useEffect, useState} from "react";
// IMPORT THIS WHENEVER YOU NEED AUTHENTICATION
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { getFirestore, getDoc, doc, setDoc} from "@firebase/firestore";
import Loading from "../../components/loading/Loading";

const db = getFirestore();
var provider = new GoogleAuthProvider();

const FirebaseContainer = () => {

  const [loading, setLoading] = useState(true);

  const auth = getAuth()
  const nav = useNavigate();

  const signIn = ()=>{
    signInWithPopup(auth, provider)
  }

	useEffect(() => {
    setLoading(true);
    const checkUser = async(user)=>{
      const docRef = doc(db, "users",`${user.uid}`);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        let emptyArray = []
        await setDoc(docRef, {
          name: user.displayName,
          questionIds: emptyArray,
          reviewPaths: emptyArray,
        });
      }
    }
  
    onAuthStateChanged(auth, (user) => {

      if (user) {
          checkUser(user).then(()=>(nav("/")))
      } 
    });

    setLoading(false);
	}, [auth, nav])


  const GoogleButton = ()=>{
    return(
      <div>
        <button onClick={signIn} className="boxShadow" style={{ width: "auto", height: 5 + "rem", padding: 1 + "rem", display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 1 + "rem", border: "none" }}>
          <img src="googleLogo.png" alt="google" style={{ width: "auto", height: 100 + "%" }}></img>
          <span style={{ lineHeight: 5 + "rem", fontSize: 1.5 + "rem", paddingLeft: 0.5 + "rem" }}>Sign In with Google</span>
        </button>
      </div>
    )
  }
  
  return (
    <>
      {loading ? <Loading /> : <GoogleButton />}
    </>
  );
};
export default FirebaseContainer;

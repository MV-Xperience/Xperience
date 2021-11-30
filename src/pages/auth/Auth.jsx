import React, { useEffect } from "react";
// IMPORT THIS WHENEVER YOU NEED AUTHENTICATION
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, getDoc, doc, setDoc } from "@firebase/firestore";

const db = getFirestore();
var provider = new GoogleAuthProvider();

const FirebaseContainer = () => {
    const auth = getAuth();
    const nav = useNavigate();

    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    useEffect(() => {
        const checkUser = async (user) => {
            const docRef = doc(db, "users", `${user.uid}`);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                let emptyArray = [];
                await setDoc(docRef, {
                    name: user.displayName,
                    questionIds: emptyArray,
                    reviewPaths: emptyArray,
                    readQuestions: emptyArray,
                });
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                checkUser(user).then(() => nav("/"));
            }
        });
    }, [auth, nav]);

    return (
        <div>
            <button onClick={signIn} className='boxShadow' style={{ width: "auto", height: 5 + "rem", padding: 1 + "rem", display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 1 + "rem", border: "none" }}>
                <img src='googleLogo.png' alt='google' style={{ width: "auto", height: 100 + "%" }}></img>
                <span style={{ lineHeight: 5 + "rem", fontSize: 1.5 + "rem", paddingLeft: 0.5 + "rem" }}>Sign In with Google</span>
            </button>
        </div>
    );
};
export default FirebaseContainer;
